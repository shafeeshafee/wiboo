import React, { useEffect, useState } from "react";
import io from "socket.io-client";

let socket;
const CONNECTION_PORT = "localhost:5000";

function Home() {
  // Before Login
  const [userEntered, setUserEntered] = useState(false);
  const [room, setRoom] = useState("");
  const [userName, setUserName] = useState("");

  // After Login
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket = io(CONNECTION_PORT);
  }, [CONNECTION_PORT]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList([...messageList, data]);
    });
  });
  const connectToRoom = () => {
    setUserEntered(true);
    socket.emit("join_room", room);
  };

  const sendMessage = async () => {
    let messageContent = {
      room: room,
      content: {
        author: userName,
        message: message,
      },
    };

    await socket.emit("send_message", messageContent);
    setMessageList([...messageList, messageContent.content]);
    setMessage("");
  };

  return (
    <div>
      <div className="App">
        {!userEntered ? (
          <div className="logIn">
            <div className="inputs">
              <input
                type="text"
                placeholder="Choose a Username..."
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
              <input
                type="text"
                placeholder="Room..."
                onChange={(e) => {
                  setRoom(e.target.value);
                }}
              />
            </div>
            <button onClick={connectToRoom}>Enter Chat</button>
          </div>
        ) : (
          <div className="chatContainer">
            <div className="messages">
              {messageList.map((val, key) => {
                return (
                  <div
                    className="messageContainer"
                    id={val.author == userName ? "You" : "Other"}
                  >
                    <div className="messageIndividual">
                      {val.author}: {val.message}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="messageInputs">
              <input
                type="text"
                placeholder="Message..."
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
