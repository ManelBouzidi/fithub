import React, { useState, useEffect } from 'react';
import { io } from "socket.io-client";

const socket = io("http://localhost:5173"); 

socket.on("connect", () => {
  console.log(`Connected to server: ${socket.id}`);
});

socket.emit("chat message", "Hello, chat room!");

socket.on("chat message", (message) => {
    console.log(`Received message: ${message}`);
  });
  
const Chat = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on('chat message', (msg) => {
        console.log("Message received in client:", msg);
        setMessages((prevMessages) => [...prevMessages, msg]);
      });

    return () => {
      socket.off('chat message');
    };
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
    console.log( socket.emit('chat message', message));
      setMessage(''); 
    }
  };

  return (
    <div className="chat-container" style={styles.container}>
      <h2>Chat Room</h2>
      <div className="chat-messages" style={styles.messages}>
        {messages.map((msg, index) => (
          <div key={index} style={styles.message}>
            {msg}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} style={styles.form}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Send</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '50px',
    fontFamily: 'Arial, sans-serif',
  },
  messages: {
    width: '300px',
    height: '400px',
    overflowY: 'auto',
    border: '1px solid #ddd',
    padding: '10px',
    marginBottom: '10px',
  },
  message: {
    padding: '8px',
    borderBottom: '1px solid #f1f1f1',
  },
  form: {
    display: 'flex',
    width: '300px',
  },
  input: {
    flex: 1,
    padding: '10px',
  },
  button: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
};

export default Chat;
