import './App.css';
import io from 'socket.io-client'
import { useState } from "react";
import Chat from './Chat';

var socket = io.connect("http://localhost:3001")
function App() {
  const [username, setUserName] = useState("");
  const [room, setRoom] = useState("");

  const joinRoom = () =>{ // establish connection between user and room 
    // only join a room if have username or room
    if (username!== '' && room !== ''){
      socket.emit("joinRoom", room); //passes this in as data.
    }
  }

  return (
    <div className="App">
      <div className ="joinChatContainer">
        <h3>Join Chat</h3>
        <input 
          type = "text"
          placeholder='Name' 
          onChange={(event) =>{
            setUserName(event.target.value); // the username is set to whatever is being written in input
          }}
          />

        <input
          type = "text" 
          placeholder='RoomID'
          
          onChange={(event) =>{
            setRoom(event.target.value); // the username is set to whatever is being written in input
          }}
          
          />
        <button onClick={joinRoom}>Join</button>

        <Chat socket={socket} username = {username} room = {room} />
      </div>
    </div>
  );
}

export default App;
