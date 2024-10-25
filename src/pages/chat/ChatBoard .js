import React, { useEffect, useState, useCallback } from 'react';
import ChatRoom from '../../components/chat/ChatRoom';
import axios from "axios";
import '../../scss/chat/chatBoard.scss';
import Header from '../../components/frame/Header';
import Footer from '../../components/frame/Footer';
import useAlarmWebSocket from '../../components/frame/useAlarmWebSocket';

const ChatBoard = () => {
  const [chatRooms, setChatRooms] = useState([]);
  const [page, setPage] = useState(0); // 현재 페이지 번호
  const [liveRooms,setLiveRooms] = useState([]);
  const [livePage, setLivePage] = useState(0); // 현재 페이지 번호
  const [hasMore, setHasMore] = useState(true); // 더 가져올 데이터가 있는지 여부
  const serverUrl = "http://localhost:9090/room";
  //useAlarmWebSocket()
  
  useEffect(() => {
    fetchData(page); // 초기 데이터 로드
  }, [page]); // page가 변경될 때마다 fetchData 호출
  
  const fetchData = async (pageNumber) => {
    if (!hasMore) return; // 더 이상 가져올 데이터가 없으면 함수 종료
    
    try {
      const res = await axios.get(`${serverUrl}?page=${pageNumber}`, {
        headers: {
          // Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
        }
      });
      console.log(res)
      const roomList = res.data.pageItems.content;
      console.log(roomList)
      if (roomList.length === 0) {
        setHasMore(false); // 더 이상 데이터가 없으면 상태 업데이트
      } else {
        setChatRooms((prev) => [...prev, ...roomList]); // 기존 데이터와 새로 가져온 데이터 합치기
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 스크롤 이벤트 핸들러
  const handleScroll = useCallback(() => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      setPage((prev) => prev + 1); // 페이지 번호 증가
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll); // 스크롤 이벤트 리스너 추가
    return () => {
      window.removeEventListener('scroll', handleScroll); // 클린업 함수로 이벤트 리스너 제거
    };
  }, [handleScroll]);
  
  //tabClick 이벤트


  return (
    <>
    <Header/>
      <div className="chat-page">
        <div className="chat-room-list">
          {chatRooms.map((room, index) => (
            <ChatRoom
              key={index}
              roomId={room.id}
              title={room.title}
              description={room.description}
              members={room.ownerId}
              date={room.updatedAt} // 필드 이름을 corrected
            />
          ))}
        </div>
        {hasMore && <div className="loading">Loading...</div>} {/* 로딩 표시 */}
      </div>
    <Footer/>
    </>
  );
};

export default ChatBoard;