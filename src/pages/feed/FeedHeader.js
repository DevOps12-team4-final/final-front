import React from 'react'
function FeedHeader({profileImage, nickname, regdate}) {

    // 시간 차이를 계산하는 함수
    function timeAgo(regdate) {
        const now = new Date(); // 현재 시간
        const postedTime = new Date(regdate); // 게시물이 올라온 시간
        const diff = now - postedTime; // 시간 차이 (밀리초)

        const seconds = Math.floor(diff / 1000); // 초로 변환
        const minutes = Math.floor(seconds / 60); // 분으로 변환
        const hours = Math.floor(minutes / 60); // 시간으로 변환
        const days = Math.floor(hours / 24); // 일로 변환

        if (days > 0) {
            return `${days} day${days > 1 ? 's' : ''} ago`;
        } else if (hours > 0) {
            return `${hours} hour${hours > 1 ? 's' : ''} ago`;
        } else if (minutes > 0) {
            return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        } else {
            return `Just now`;
        }
    };


    return (
        <div className='feed_header'>
            <div className='user_info'>
                <img src={profileImage} alt='프로필 사진'/>
                <div>
                    <strong>{nickname}</strong><br />
                    <span>{timeAgo(regdate)}</span>
                </div>
            </div>
            <button className='feed_message_button'>메시지</button>
        </div>
    )
}

export default FeedHeader