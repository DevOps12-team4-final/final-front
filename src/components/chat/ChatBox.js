// Chat.js
import React from 'react';
import { useSelector } from 'react-redux';
const ChatBox = ({ chat ,flag }) => {
  const LoginUserId =  useSelector(state => state.userSlice.userId);
  
  const showMessage =() =>{
    if(chat.type == "chat"){
      return <div className="chat-message">{chat.message}</div>
    }
    if(chat.type == "image"){
     return <img src={chat.message} alt={`chatImg`} className="chat-img"/>
           
    }
    return <img src={"/imgs/fileImg.png"} alt={`chatDefault`} className="chat-file"/>
  }
  const showProfileImg =() =>{
    const imgClass = flag ? "profile-image hidden" : "profile-image";

    if(chat.profileImage !== null && chat.profileImage !== undefined )
    {
      return <img src={chat.profileImage} alt="profile" className={imgClass} />
    }
    return <img src={"/imgs/defaultProfile.png"} alt="profile" className={imgClass} />
  }
    
  return (
    <div className={`chat-item ${chat.userId === LoginUserId ? 'sent' : 'received'} ${chat.userId}`} >    
      <div className="chat-content">
        <div className="chat-user">{chat.username}</div>
        {showMessage()}
        <div className="chat-date">{chat.date}</div>
      </div>
      {showProfileImg()}
    </div>
  );
};

export default ChatBox;