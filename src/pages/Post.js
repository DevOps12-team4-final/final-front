import { useLocation } from 'react-router-dom';
import Footer from '../pages/frame/Footer'
import Header from '../pages/frame/Header';
import React, { useEffect, useState } from 'react';

function Post() {
  const location = useLocation();
  const user = location.state; // user 데이터를 state로부터 가져오기
  const [profileImage, setProfileImage] = useState(null);
  
  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await fetch('/api/user/profile-image', { credentials: 'include' });
        if (response.ok) {
          const image = await response.text();
          setProfileImage(image); // 상태에 이미지 경로 저장
        }
      } catch (error) {
        console.error("Error fetching profile image:", error);
      }
    };

    fetchProfileImage();
  }, []);
  return (
    <div>
      <Header/>
      <h1>게시물 페이지</h1>
      
      {user && <p>{user.nickname}님, 환영합니다!</p>}
      <Footer profileImage={profileImage} />
      </div>
    
  );
}

export default Post;