import React from 'react'
import {useState, useEffect} from 'react'
import '../../scss/framescss/Footer.scss';

function FeedFooter({ initialLikeCount, feedId }) {

    const [likeCount, setLikeCount] = useState(initialLikeCount);
    const [isHeartFilled, setIsHeartFilled] = useState(false);
    const [isBookmarkFilled, setIsBookmarkFilled] = useState(false);

    useEffect(() => {
        // 초기 좋아요 수 및 사용자가 좋아요를 눌렀는지 여부 확인
        fetch(`/feeds/${feedId}/like-count`, {
            headers: { 'Authorization': `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}` }
        })
            .then(response => response.json())
            .then(data => {
                setLikeCount(data.item.likeCount);
                setIsHeartFilled(data.item.isLiked);
            })
            .catch(error => console.log('Error fetching like count:', error));

            // 북마크 상태 가져오기
        fetch(`/bookMarks/${feedId}`, { // 북마크 상태만 반환하는 엔드포인트
            headers: { 'Authorization': `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}` }
        })
            .then(response => response.json())
            .then(data => {
                setIsBookmarkFilled(data.item.isMarked); // 북마크 여부 설정
            })
            .catch(error => console.log('Error fetching bookmark status:', error));
    }, [feedId]);

    const toggleHeart = () => {
        const token = sessionStorage.getItem('ACCESS_TOKEN');
        
        if(isHeartFilled){
            // 좋아요 취소 요청
            fetch(`/feeds/${feedId}/like`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }).then(response => {
                if(response.ok){
                    setIsHeartFilled(false);
                    setLikeCount(prevCount => prevCount - 1); // 좋아요 개수 감소
                } else {
                    console.error('Failed to remove like');
                }
            }).catch(error => console.error('Error removing like:', error));
        } else {
            // 좋아요 추가 요청
            fetch(`/feeds/${feedId}/like`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`  // 토큰 추가
                },
            }).then(response => {
                if (response.ok) {
                    setIsHeartFilled(true);
                    setLikeCount(prevCount => prevCount + 1);  // 좋아요 개수 증가
                } else {
                    console.error('Failed to add like');
                }
            }).catch(error => console.error('Error adding like:', error));
        }
        setIsHeartFilled(!isHeartFilled);
    };

    const toggleBookmark = () => {
        const token = sessionStorage.getItem('ACCESS_TOKEN');

        if(isBookmarkFilled) {
            // 북마크 제거 요청
            fetch(`/bookMarks/${feedId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }).then(response => {
                if(response.ok) {
                    setIsBookmarkFilled(false);
                } else {
                    console.error('Failed to remove bookmark');
                }
            }).catch(error => console.error('Error removing bookmark:', error));
        } else{
            // 북마크 추가 요청
            fetch(`/bookMarks/${feedId}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }).then(response => {
                if(response.ok) {
                    setIsBookmarkFilled(true);
                } else {
                    console.error('Failed to add bookmark');
                }
            }).catch(error => console.error('Error adding bookmark:', error));
        }
        setIsBookmarkFilled(!isBookmarkFilled);
    };


    return (
        <div>
            <div className='feed_footer'>
                <p>좋아요 {likeCount}개</p>
                <span>댓글 0</span>
            </div>    
            <div className="feed_actions">
                <div>
                    <button className='feedFooter_icon_button'>
                    <span 
                        className="material-icons" 
                        onClick={toggleHeart} 
                        style={{ cursor: 'pointer', fontSize: '24px', color: 'black' }} // 아이콘 스타일 추가
                    >
                        {isHeartFilled ? 'favorite' : 'favorite_border'}
                    </span>
                    </button>
                </div>
                <div>
                    <button className='feedFooter_icon_button'>
                        <span className="material-icons">comment</span>
                    </button>
                </div>
                <div>
                    <button className='feedFooter_icon_button'>
                        <span 
                            className="material-icons" 
                            onClick={toggleBookmark} 
                            style={{ cursor: 'pointer', fontSize: '24px', color: 'black' }} // 아이콘 스타일 추가
                        >
                            {isBookmarkFilled ? 'bookmark' : 'bookmark_border'}
                        </span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FeedFooter