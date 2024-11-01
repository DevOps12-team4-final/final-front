import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from "axios";



const ChatRoom = ({ roomId,title, description, profileImg, date }) => {
  const navi = useNavigate();
  const serverUrl ="http://localhost:9090/room"
  const LoginUserId = useSelector(state => state.userSlice.userId);

  const enterRoom = async () => {
    try {
      const res = await axios.get(`${serverUrl}/join/${roomId}`, {
        headers: {
          // Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
        },
        params:{
          user_id:LoginUserId
        }
      });
      if(res.data.statusCode == 200){
        navi(`/chatRoom/${roomId}`)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const roomProfileImg = ()=>{
    if(profileImg !== null && profileImg !== undefined){
      return <img key={roomId} src={profileImg} alt={`member-${roomId}`} />
    }
    return <img key={roomId} src={require('../../images/default-profile.jpg')} alt={`member-${roomId}`} />
  }

  const formatDate = (dateArray) => {

    const year = dateArray[0]
    const month = dateArray[1]
    const day = dateArray[2]

    return `${year}.${month}.${day}`; // 원하는 형식으로 반환
  };


  return (
    <div className="chat-room" onClick={enterRoom}>
      <div className="members">
          { roomProfileImg()}
      </div>
      <div className="chat-details">
        <div className="chat-title">
          <span>{title}</span>
          <span className="date">{formatDate(date)}</span>
        </div>
        <div className="description">{description}</div>
      </div>
    </div>
  );
}

export default ChatRoom;