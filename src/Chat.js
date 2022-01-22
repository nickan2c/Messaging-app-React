import React, { useEffect } from 'react';
import { useState } from "react";

function Chat({socket, username, room}) {

    const [currentMessage, setCurrentMessage] = useState(""); // sets currentmessage to 0
    // and creates a function for setting this message. It is mainly called in onchange, 
    // so username is set as the user types into that input box

    const sendMessage = async ()=> { // asynchronous, wait for message to send to update
        if (currentMessage !==''){
            const messageData = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getHours() +
                ":"+
                new Date(Date.now()).getMinutes(),
            };
        
        await socket.emit("send_message", messageData);
        }
    }

    useEffect(()=> {
        socket.on("receive_message", (data)=>{
            console.log(data);
        })
    }, [socket]);


  return (<div>
      <div className='chat-header'>
          <p>Live Chat</p>
      </div>
      <div className='chat-body'></div>

      <div className='chat-footer'>
          <input type = 'text' placeholder = 'Send a Chat'
            onChange={(event) =>{
            setCurrentMessage(event.target.value); // the username is set to whatever is being written in input
          }}
          />
          <button onClick={sendMessage}> Send</button>
      </div>

  </div>);
  }

export default Chat;
