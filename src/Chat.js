import React, { useEffect } from 'react';
import { useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({socket, username, room}) {

    const [currentMessage, setCurrentMessage] = useState(""); // sets currentmessage to 0
    // and creates a function for setting this message. It is mainly called in onchange, 
    // so username is set as the user types into that input box

    const [messages, setMessages] = useState([]);

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
        setMessages((list) => [...list, messageData]);
        setCurrentMessage("");
        }
    }

    useEffect(() => {
        socket.on("receive_message", (data) => {
          setMessages((list) => [...list, data]);
        });
      }, [socket]);


    return (
        <div className="chat-window">
          <div className="chat-header">
            <p>Live Chat</p>
          </div>
          <div className="chat-body">
            <ScrollToBottom className="message-container">

              {messages.map((messageContent) => {
                return (
                  <div
                    className="message"
                    id={username === messageContent.author ? "you" : "other"}
                  >
                    <div>
                      <div className="message-content">
                        <p>{messageContent.message}</p>
                      </div>
                      <div className="message-meta">
                        <p id="time">{messageContent.time}</p>
                        <p id="author">{messageContent.author}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
              </ScrollToBottom>
          </div>
          <div className="chat-footer">
            <input
              type="text"
              value={currentMessage}
              placeholder="Send a text"
              onChange={(event) => {
                setCurrentMessage(event.target.value);
              }}
              onKeyPress={(event) => {
                event.key === "Enter" && sendMessage();
              }}
            />
            <button onClick={sendMessage}>&#9658;</button>
          </div>
        </div>
      );
    }

export default Chat;
