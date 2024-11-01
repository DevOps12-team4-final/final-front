import React, { useEffect, useState } from 'react';
import AlarmBox from '../../components/alarm/AlarmBox';
import Header from '../../pages/frame/Header';
import Footer from '../../pages/frame/Footer';
import '../../scss/alarm/alarmBoard.scss'
import { useSelector } from 'react-redux';
import { useDrag, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'; 
import { get, remove } from '../../apis/alarmApi'; // 알림 제거를 위한 액션 가져오기
import { useDispatch } from 'react-redux';
import { compileString } from 'sass';


const AlarmList = () => {
  // Redux에서 alarms 상태 가져오기
  const alarms =  useSelector(state => state.alarmSlice.alarms);
  const loginUserId = useSelector(state => state.userSlice.userId)
  const dispatch = useDispatch();
  //가공
  useEffect(()=>{
    getInitAlarms()
  },[])

  useEffect(()=>{
    console.log(alarms)
  },[])
  
  const getInitAlarms =async () =>{
    await dispatch(get(loginUserId));
    console.log("TRY GET")
  }

  const removeAlarm = (targetId) => {
    const alarmId = targetId;
    dispatch(remove(alarmId));
    console.log("remove: "+alarms)
  };

  const naviAlarm = (type,targetId) => {
    switch (type) {
      case "COMMENT_LIKE":
          navigator(`/comments/${targetId}`); // Navigate to the comment
          break;
      case "FEED_COMMENT":
          navigator(`/feed/comments/${targetId}`); // Navigate to the feed comment
          break;
      case "FEED_LIKE":
          navigator(`/feeds/${targetId}`); // Navigate to the specific feed
          break;
      case "FEED":
          navigator(`/feeds/${targetId}`); // Navigate to the feed
          break;
      case "FOLLOW":
          navigator(`/users/${targetId}`); // Navigate to the followed user profile
          break;
      case "chat":
          navigator(`/chat/${targetId}`); // Navigate to the chat with the user
          break;
      default:
          console.log("Unknown alarm type");
    }
  };


  return (
    <>
      <Header />
      <DndProvider backend={HTML5Backend}>  
      <div className="alarm-page">
        <div className="alarm-room-list">
          {/* alarms 배열을 기반으로 AlarmBox 컴포넌트 렌더링 */}
          {alarms.map((alarm, index) => {
            return <AlarmBox
              key={index}
              index={alarm.alarmId} //나중에는 userId 면 충분 slice 에 반영해서 제거하기
              nickname={alarm.nickname}
              type={alarm.type}
              message={alarm.message}
              removeAlarm={()=>{removeAlarm(alarm.alarmId)}}
              naviAlarm={naviAlarm}
              className={``}
            />
          })}
        </div>
      </div>
      </DndProvider>
      <Footer />
    </>
  );
};

export default AlarmList;
