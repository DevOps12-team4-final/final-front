import React, { useEffect, useState } from 'react';
import { useDrag } from "react-dnd";

const DRAG_THRESHOLD = -100;

const AlarmBox = ({ userId, type, targetId, message, index, naviAlarm, removeAlarm }) => {
  const LoginUserId = 1 // useSelector(state => state.memberSlice.id);
  const serverUrl = "http://localhost:9090/room";
  
  const [alarmId ,setAlarmId] = useState(index)
  const [dragOffset, setDragOffset] = useState(0);
  const [isRemoving, setIsRemoving] = useState(false); // 상태 추가

  const [{ isDragging }, drag] = useDrag({
    type: "ALARM",
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    hover: (item, monitor) => {
      const offset = monitor.getDifferenceFromInitialOffset();
      if (offset) {
        setDragOffset(Math.min(0, offset.x)); // Only allow leftward movement
      }
    },
    end: (item, monitor) => {
      const offset = monitor.getDifferenceFromInitialOffset();
      if (offset && offset.x < DRAG_THRESHOLD) {
        // 알림을 화면 밖으로 애니메이션 적용 후 제거
        setIsRemoving(true);
        setTimeout(() => {
          removeAlarm(item.index); // 애니메이션 후 실제 삭제
          setIsRemoving(false);
        }, 400); // 300ms는 애니메이션 시간과 맞춤
        
      } else {
        setDragOffset(0); // 드래그 종료 시 위치 초기화
      }
    },
  });

  const opacity = isDragging ? 0.5 : 1;

  const alarmProfileImg = () => {
    if (type === "chat") {
      return <img src={"/imgs/defaultProfile.png"} alt={'profile'} />;
    }
    return <img src={"/imgs/defaultFeed.png"} alt={'feed'} />;
  };

  const alarmDescription = () => {
    if (type === "chat") {
      return message;
    }
    if (type === "feed") {
      return `${userId}님의 새 게시글이 올라왔어요`;
    }
    return message;
  };

  return (
    <div
      ref={drag}
      className={`alarm-box `}
      style={{
        transform: `translateX(${isRemoving ? '-100%' : `${dragOffset}px`})`, // 제거될 때 왼쪽으로 사라짐
        opacity,
        transition: isDragging || !isRemoving ? "none" : "transform 0.3s ease", // 드래그 중엔 트랜지션 없음, 드래그 끝나면 0.3초 트랜지션
      }}
      onDoubleClick={() => naviAlarm(targetId)}
    >
      <div className="members">
        {alarmProfileImg()}
      </div>
      <div className="alarm-details">
        <div className="description">{alarmDescription()}</div>
      </div>
    </div>
  );
};

export default AlarmBox;