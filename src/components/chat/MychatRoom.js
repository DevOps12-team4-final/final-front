import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from "axios";

const MyChatRoom = ({ roomId, title, description, profileImg, date }) => {
  const navi = useNavigate();
  const serverUrl = "http://localhost:9090/room";
  const LoginUserId = 1; // useSelector(state => state.memberSlice.id);
  const [MyProfile, setProfile] = useState(null);
  const [MyTitle, setTitle] = useState(title);
  const [MyDescription, setDescription] = useState(description);

  // 초기 세팅
  useEffect(() => {
    setProfile(profileImg ?? "/imgs/defaultProfile.png");
  }, [profileImg]);

  // 제목 변경 핸들러
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // 설명 변경 핸들러
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  // 프로필 이미지 변경 핸들러
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfile(reader.result); // 미리보기용으로 이미지를 설정
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="my_chat-room">
      <div className="members">
        <input
          type="file"
          onChange={handleFileChange}
          className="file-input"
          style={{ display: 'none' }}
          id="file-upload"
        />
        <label htmlFor="file-upload">
          <img key={roomId} src={MyProfile} alt={`member-${roomId}`} style={{ cursor: 'pointer' }} />
        </label>
      </div>
      <div className="chat-details">
          <input
            className="chat-title"
            type="text"
            value={MyTitle}
            onChange={handleTitleChange}
          />
        <textarea
          className="description"
          rows="3"
          value={MyDescription}
          onChange={handleDescriptionChange}
        />
      </div>
    </div>
  );
};

export default MyChatRoom;

