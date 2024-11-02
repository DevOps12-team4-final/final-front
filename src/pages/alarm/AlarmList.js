import React, { useEffect } from 'react';
import AlarmBox from '../../components/alarm/AlarmBox';
import Header from '../../pages/frame/Header';
import Footer from '../../pages/frame/Footer';
import '../../scss/alarm/alarmBoard.scss';
import { useSelector, useDispatch } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { get, remove } from '../../apis/alarmApi';
import emptyImage from '../../images/empty-alarms.png'; // 빈 상태 이미지 임포트

const AlarmList = () => {
  const alarms = useSelector((state) => state.alarmSlice.alarms);
  const loginUserId = useSelector((state) => state.userSlice.userId);
  const dispatch = useDispatch();

  useEffect(() => {
    getInitAlarms();
  }, []);

  const getInitAlarms = async () => {
    await dispatch(get(loginUserId));
    console.log("TRY GET");
  };

  const removeAlarm = (url, type) => {
    dispatch(remove({
      userId: loginUserId,
      url: url,
      type: type
    }));
    console.log("remove: " + alarms);
  };

  const naviAlarm = (url, type) => {
    // 각 알림 타입에 따라 페이지 이동 처리
    switch (type) {
      case "COMMENT_LIKE":
          navigator(`/comments/${url}`);
          break;
      case "FEED_COMMENT":
          navigator(`/feed/comments/${url}`);
          break;
      case "FEED_LIKE":
          navigator(`/feeds/${url}`);
          break;
      case "FEED":
          navigator(`/feeds/${url}`);
          break;
      case "FOLLOW":
          navigator(`/users/${url}`);
          break;
      case "chat":
          navigator(`/chat/${url}`);
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
            {alarms.length > 0 ? (
              alarms.map((alarm, index) => (
                <AlarmBox
                  key={index}
                  index={alarm.alarmId}
                  nickname={alarm.nickname}
                  type={alarm.type}
                  message={alarm.message}
                  removeAlarm={() => removeAlarm(alarm.url, alarm.type)}
                  naviAlarm={() => naviAlarm(alarm.url, alarm.type)}
                />
              ))
            ) : (
              // 빈 상태일 때 이미지를 표시
              <div className="empty-alarm">
                <img style={{ width: '200px', height: '200px' }} src={emptyImage} alt="No alarms" />

                <p>새로운 알림이 없습니다.</p>
              </div>
            )}
          </div>
        </div>
      </DndProvider>
      <Footer />
    </>
  );
};

export default AlarmList;
