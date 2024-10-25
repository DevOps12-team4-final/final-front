import React, { useEffect, useState } from 'react';
import AlarmBox from '../../components/alarm/AlarmBox';
import Header from '../../components/frame/Header';
import Footer from '../../components/frame/Footer';
import '../../scss/alarm/alarmBoard.scss'
import { useSelector } from 'react-redux';
import { useDrag, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend'; 

const test_alarm = [
  {
    alarmId: 1,
    userId: 1,
    type: 'chat',
    message: 'You have a new message from John.'
  },
  {
    alarmId: 2,
    userId: 2,
    type: 'feed',
    message: '/chatBoard/111.png'
  },
  {
    alarmId: 3,
    userId: 3,
    type: 'chat',
    message: 'Mike mentioned you in a comment.'
  },
  {
    alarmId: 4,
    userId: 4,
    type: 'chat',
    message: 'Sarah liked your post.'
  },
  {
    alarmId: 5,
    userId: 5,
    type: 'chat',
    message: 'You have an upcoming event tomorrow.'
  },
  {
    alarmId: 6,
    userId: 6,
    type: 'chat',
    message: 'Tom started following you.'
  },
  {
    alarmId: 7,
    userId: 7,
    type: 'chat',
    message: 'Kate replied to your comment.'
  }
];



const AlarmList = () => {
  // Redux에서 alarms 상태 가져오기
  const [alarms,setAlarms] = useState([]) //only_test  useSelector(state => state.alarmSlice);
  useEffect(() =>{
    setAlarms(test_alarm)
  },[])


  const removeAlarm = (index) => {
    setAlarms(alarms.filter((alarm) => alarm.alarmId !== index));
    console.log("remove: "+alarms)
  };
  const naviAlarm = (type,targetId) => {
    if(type === "chat")
    {

    }
    if(type ==="feed"){

    }
    //setAlarms(alarms.filter((_, i) => i !== index));
  };

  console.log(alarms)
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
              userId={alarm.userId}
              type={alarm.type}
              message={alarm.message}
              removeAlarm={removeAlarm}
              naviAlarm={naviAlarm}
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
