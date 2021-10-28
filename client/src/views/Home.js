import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import notification from "../audio/notification.mp3";
import useSound from "use-sound";
import { css } from "@emotion/css";
import ScrollToBottom from "react-scroll-to-bottom";

import sendBtn from "../icons/send-btn.png";
import formatAMPM from "../helpers/GetDate";

let socket;
const CONNECTION_PORT = `https://app-mutyjmjnfq-uc.a.run.app`;

function Home() {
  const [play] = useSound(notification, { volume: 0.05 });

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
      play();
    });
  });
  const connectToRoom = () => {
    setUserEntered(true);
    socket.emit("join_room", room);
  };

  const sendMessage = async () => {
    if (!message) {
      alert("Messages can't be blank.");
      return;
    }
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

  const ROOT_CSS = css({
    height: "100%",
    width: "100%",
  });

  return (
    <div>
      <div>
        {!userEntered ? (
          <div className="logIn">
            <h3 style={{ padding: "1rem", fontSize: "2rem" }}>
              Welcome! Enjoy your stay~
            </h3>
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
                placeholder="Enter a Room ID..."
                onChange={(e) => {
                  setRoom(e.target.value);
                }}
              />
            </div>
            <button onClick={connectToRoom}>Enter Chat</button>
          </div>
        ) : (
          <div className="chatContainer">
            <div className="room-info">
              Entered as: {userName} || Chat Room: {room}
            </div>
            <div className="messages">
              <ScrollToBottom className={ROOT_CSS}>
                {messageList.map((val, key) => {
                  return (
                    <div
                      className="messageContainer"
                      id={val.author === userName ? "You" : "Other"}
                    >
                      <div className="messageIndividual">
                        <span className="timestamp-chat">
                          {formatAMPM(new Date())}
                        </span>
                        - {val.author}: {val.message}{" "}
                      </div>
                    </div>
                  );
                })}
              </ScrollToBottom>
            </div>

            <div className="messageInputs">
              <input
                type="text"
                placeholder="Message..."
                onChange={(e) => {
                  setMessage(e.target.value);
                }}
                value={message}
              />
              <button onClick={sendMessage}>
                <img src={sendBtn} alt="send-btn" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
