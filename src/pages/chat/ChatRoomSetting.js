import React from 'react'
import  MyChatRoom from '../../components/chat/MychatRoom'
import '../../scss/chat/chatSetting.scss';
import Header from '../../pages/frame/Header';
import Footer from '../../pages/frame/Footer';
//내 챗룸 1개 가져와서  파라미터 수정하기
const ChatRoomSetting = () => {
  //내꺼 chatRoom 가져오기 
  return (
  <>
  
    <Header/>
    <div className="settings-container">
      <div className="section-board">
        <h2>채팅방</h2>
        <div style={{margin: '3rem'}}>
          <MyChatRoom/>
        </div>
      </div>
      {/* My Account Section */}
      <div className="section">
        <h2>내 계정</h2>
        <div className="info-row">
          <span className="label">이메일</span>
          <span className="value">bitcamp@naver.com</span>
        </div>
        <div className="info-row">
          <span className="label">사용자 이름</span>
          <span className="value">Sang_Jn</span>
        </div>
        <div className="info-row">
          <button className="change-password-btn">비밀번호 변경</button>
        </div>
      </div>

      {/* App Settings Section */}
      <div className="section">
        <h2>앱 설정</h2>
        <div className="info-row">
          <span className="label">알림</span>
          <span className="action-arrow">{'>'}</span>
        </div>
        <div className="info-row">
          <span className="label">차단</span>
          <span className="action-arrow">{'>'}</span>
        </div>
      </div>

      {/* Information Section */}
      <div className="section">
        <h2>정보</h2>
        <div className="info-row">기능 제안하기</div>
        <div className="info-row">공지사항</div>
        <div className="info-row">이용약관</div>
        <div className="info-row">개인정보 처리방침</div>
      </div>
    </div>
    <Footer/>
  </>
  );
}

export default ChatRoomSetting
