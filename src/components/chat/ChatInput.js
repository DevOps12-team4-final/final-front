import React, { useState } from 'react';



const ChatInput = ({ send_message,send_file ,roomId,userId }) => {
  const [message, setMessage] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      const chat_form = {
        roomId: roomId,
        userId: userId,
        type: 'Chat',
        message: message,
      };
      send_message(chat_form);
      setMessage('');
    }

  };

  const handleFileChange = async (e) => {
    const formData = new FormData();
    const roomChat ={
      roomId:roomId,
      userId:userId
    }

    formData.append('uploadFiles', e.target.files[0]);
    formData.append('roomId',roomId)
    formData.append('userId',userId)
    send_file(formData)
  };

  return (
    <form className="chat-input-form" onSubmit={handleSubmit}>
      <div className="input-container">
        <input
          type="file"
          onChange={handleFileChange}
          className="file-input"
          style={{ display: 'none' }} // Hide the default file input style
          id="file-upload"
        />
        <label htmlFor="file-upload" className="file-upload-label">
          📎
        </label>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="채팅 입력..."
          className="chat-input"
        />
      </div>
    </form>
  );
};

export default ChatInput;