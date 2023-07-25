import "./App.css";

function MyButton() {
  return <button className="item btn">I'm a button</button>;
}

function App() {
  return (
    <div className="main">
      <div className="header">
        <h1>Hello Chat</h1>
      </div>
      <div className="main-area">
        <div className="users">
          <p>Ivan</p>
          <p>Manfres</p>
          <p>fritz</p>
        </div>
        <div className="text-msgs">
          <div className="text-msg own-msg">lorem</div>
          <div className="text-msg">lorem</div>
          <div className="text-msg">lorem</div>
          <div className="text-msg">lorem</div>
          <div className="text-msg">lorem</div>
          <div className="text-msg">lorem</div>
          <div className="text-msg">lorem</div>
          <div className="text-msg">lorem</div>
          <div className="text-msg">lorem</div>
        </div>
      </div>
      <div className="input-area">
        <textarea rows={3} className="text-input" />
        <MyButton />
      </div>
      <div className="footer">Footer</div>
    </div>
  );
}

export default App;
