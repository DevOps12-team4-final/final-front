import React, { useState } from 'react';

function FeedHeader({profileImage, nickname, regdate, isFollowing: initialIsFollowing, userId, onMoreClick}) {
    // 초기 팔로우 상태 설정
    const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
    // 모달 상태 추가
    // const [isModalOpen, setIsModalOpen] = useState(false);

    // 팔로우 상태 토글 함수
    const handleFollowToggle = async () => {
        try {
            const token = sessionStorage.getItem('ACCESS_TOKEN');
            console.log(isFollowing);
            if (isFollowing) {
                // 언팔로우 API 호출
                const response = await fetch(`/follows/unfollow/${userId}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (response.ok) {
                    setIsFollowing(false);
                    console.log(isFollowing);
                }
            } else {
                // 팔로우 API 호출
                const response = await fetch(`/follows/follow`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId: userId }),
                });
                if (response.ok) {
                    setIsFollowing(true);
                    console.log(isFollowing);
                }
            }
        } catch (error) {
            console.error("팔로우/언팔로우 실패:", error);
        }
    };

    // const handleMoreClick = () => {
    //     setIsModalOpen(!isModalOpen);
    // };

    // const handleCloseModal = () => {
    //     setIsModalOpen(false);
    // };

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
            <div className='feed_header_box'>
                <button className='feed_message_button' onClick={handleFollowToggle}>
                    {isFollowing ? '팔로잉' : '팔로우'}
                </button>
                <span className="material-icons" 
                      style={{ cursor: 'pointer', fontSize: '28px'}}
                      onClick={onMoreClick}>more_vert</span>
            </div>
        
            {/* modal */}
            {/* {isModalOpen &&(
                <div className='modal_overlay' onClick={handleCloseModal}>
                    <div className='modal_content' onClick={(e) => e.stopPropagation()}>
                        <button className='modal_button' onClick={() => console.log("차단")}>
                            차단
                        </button>
                        <button className='modal_button' onClick={() => console.log("신고")}>
                            신고
                        </button>
                    </div>
                </div>
            )} */}
        </div>
    );
}

export default FeedHeader