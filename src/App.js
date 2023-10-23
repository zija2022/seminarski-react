import { useEffect, useState } from "react";
import "./App.css";

function getRandomName() {
  const adjs = [
    "autumn",
    "hidden",
    "bitter",
    "misty",
    "silent",
    "empty",
    "dry",
    "dark",
    "summer",
    "icy",
    "delicate",
    "quiet",
    "white",
    "cool",
    "spring",
    "winter",
    "patient",
    "twilight",
    "dawn",
    "crimson",
    "wispy",
    "weathered",
    "blue",
    "billowing",
    "broken",
    "cold",
    "damp",
    "falling",
    "frosty",
    "green",
    "long",
    "late",
    "lingering",
    "bold",
    "little",
    "morning",
    "muddy",
    "old",
    "red",
    "rough",
    "still",
    "small",
    "sparkling",
    "throbbing",
    "shy",
    "wandering",
    "withered",
    "wild",
    "black",
    "young",
    "holy",
    "solitary",
    "fragrant",
    "aged",
    "snowy",
    "proud",
    "floral",
    "restless",
    "divine",
    "polished",
    "ancient",
    "purple",
    "lively",
    "nameless",
  ];
  const noums = [
    "waterfall",
    "river",
    "breeze",
    "moon",
    "rain",
    "wind",
    "sea",
    "morning",
    "snow",
    "lake",
    "sunset",
    "pine",
    "shadow",
    "leaf",
    "dawn",
    "glitter",
    "forest",
    "hill",
    "cloud",
    "meadow",
    "sun",
    "glade",
    "bird",
    "brook",
    "butterfly",
    "bush",
    "dew",
    "dust",
    "field",
    "fire",
    "flower",
    "firefly",
    "feather",
    "grass",
    "haze",
    "mountain",
    "night",
    "pond",
    "darkness",
    "snowflake",
    "silence",
    "sound",
    "sky",
    "shape",
    "surf",
    "thunder",
    "violet",
    "water",
    "wildflower",
    "wave",
    "water",
    "resonance",
    "sun",
    "wood",
    "dream",
    "cherry",
    "tree",
    "fog",
    "frost",
    "voice",
    "paper",
    "frog",
    "smoke",
    "star",
  ];
  return (
    adjs[Math.floor(Math.random() * adjs.length)] +
    "_" +
    noums[Math.floor(Math.random() * noums.length)]
  );
}

function getRandomColor() {
  return "#" + Math.floor(Math.random() * 0xffffff).toString(16);
}

const name = getRandomName();
const color = getRandomColor();
const CHANNEL_ID = "O05N1l4gI40CJNJP";
let drone = null;

function App() {
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    if (drone != null) return;
    drone = new window.ScaleDrone(CHANNEL_ID, {
      data: {
        name: name,
        color: color,
      },
    });
    drone.on("open", (error) => {
      if (error) {
        return console.error(error);
      }
      console.log("Succesfully connected to Scaledrone");

      const room = drone.subscribe("observable-room");
      room.on("open", (error) => {
        if (error) {
          return console.error(error);
        }
        console.log("Succesfully joind room");
      });

      // lista sudionika koji su online
      room.on("members", (members) => {
        console.log("members", members);
        setMembers(members);
      });

      // sudionici koji su u chat sobi
      room.on("member_join", (member) => {
        console.log("join");
        setMembers((members) => [...members, member]);
      });

      // sudionici koji su izašli iz sobe
      room.on("member_leave", ({ id }) => {
        const index = members.findIndex((member) => member.id === id);
        console.log("leave");
        const newMembers = [...members].splice(index, 1);
        setMembers(newMembers);
      });

      room.on("data", (text, member) => {
        if (member) {
          setMessages((messages) => [...messages, { ...member, text }]);
        } else {
          //Message dolazi sa servera
        }
      });
    });
  }, []);

  function sendMessage() {
    if (!text) return;
    drone.publish({
      room: "observable-room",
      message: text,
    });
    setText("");
  }

  function changeText(event) {
    setText(event.target.value);
  }

  return (
    <div className="main">
      <div className="header">
        <h1>Ivanov mega fantastični chat</h1>
      </div>
      <div className="main-area">
        <div className="users">
          {members.length === 0 && "Connecting.."}
          {members.map((member) => {
            const { name, color } = member.clientData;
            return (
              <p key={member.id} style={{ color: color }}>
                {name}
              </p>
            );
          })}
        </div>
        <div className="text-msgs">
          {messages.map((message, i) => (
            <div
              key={i}
              className={
                "text-msg" +
                (message.clientData.name === name ? " own-msg" : "")
              }
            >
              <div style={{ color: message.clientData.color }}>
                {message.clientData.name}:
              </div>
              <div>{message.text}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="input-area">
        <textarea
          rows={3}
          className="text-input"
          placeholder="start typing.."
          onChange={changeText}
          value={text}
        />
        <button onClick={sendMessage} className="btn">
          Send
        </button>
      </div>
      <div className="footer">© Ivan Višnjić, Copyright 2023</div>
    </div>
  );
}

export default App;
