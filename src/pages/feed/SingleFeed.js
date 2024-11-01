import React, { useEffect, useState } from 'react'
import FeedContent from '../followingfeed/FeedContent'
import FeedHeader from '../followingfeed/FeedHeader'
import FeedFooter from '../followingfeed/FeedFooter'
import Footer from '../frame/Footer'
import Header from '../frame/Header'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import '../../scss/Feed.scss'

const SingleFeed = () => {
  const [feedItem,setFeed] = useState(null)
  const baseURL = "https://kr.object.ncloudstorage.com/bobaesj/"
  const { feedId } = useParams();
  
  const { profileImage } = useSelector((state) => state.userSlice || {});
  // 각 게시물의 슬라이드 인덱스를 저장할 배열
  const [currentIndexes, setCurrentIndexes] = useState([]);
  // 현재 드래그 중인 게시물 인덱스 상태
  const [currentFeedIndex, setCurrentFeedIndex] = useState(0);



  // 드래그 상태 관리
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);


  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);

  const [isBlocked, setIsBlocked] = useState(false); 
 


  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
  };
  const closeModal = () => {
      setIsModalOpen(false);
  };

  const handleBlockToggle = async (userId) => {
      const token = sessionStorage.getItem('ACCESS_TOKEN');
      try {
          if (isBlocked) {
              // 차단 해제 요청
              const response = await fetch(`/blocks/${userId}`, {
                  method: 'DELETE',
                  headers: {
                      'Authorization': `Bearer ${token}`,
                      'Content-Type': 'application/json',
                  },
              });
              if (response.ok) {
                  setIsBlocked(false);
              }
          } else {
              // 차단 요청
              const response = await fetch(`/blocks`, {
                  method: 'POST',
                  headers: {
                      'Authorization': `Bearer ${token}`,
                      'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({ userId }),
              });
              if (response.ok) {
                  setIsBlocked(true);
              }
          }
      } catch (error) {
          console.error("차단/차단 해제 실패:", error);
      }
  };


  useEffect(()=>{
    console.log(feedId)
    getFeed();
  },[])

  useEffect(()=>{
     // 애니메이션을 적용하기 위해 각 게시물에 클래스 추가
     setTimeout(() => {
        document.querySelectorAll('.feed_box').forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('slide-in'); // 슬라이드 인 클래스를 추가
            }, index * 100); // 각 게시물마다 약간의 지연을 둡니다.
        });
    }, 100);
  },[feedItem])

  const getFeed = async () =>{
    try {
        const response = await fetch(`/feeds/${feedId}`);
        const data = await response.json();
        console.log(data)
        setFeed(data.item);
      } catch (error) {
        console.error('Error fetching feed:', error);
      }
  }

  return (
    <div id='feed'>
                <Header />
                {feedItem ? (
                <div key={feedItem.feedId} className="feed_box">
                    <FeedHeader 
                        profileImage={`${baseURL}${feedItem.profileImage}`}
                        userId={feedItem.userId}
                        isFollowing={feedItem.following}
                        nickname={feedItem.nickname}
                        regdate={feedItem.regdate} 
                        onMoreClick={toggleModal} 
                    />  

                    <FeedContent 
                        content={feedItem.content}
                        feedFileDtoList={feedItem.feedFileDtoList}
                        currentIndex={0}
                        onMouseDown={() => {}}
                        onMouseMove={() => {}}
                        onMouseUp={() => {}}
                        goToSlide={() => {}}
                        isDragging={isDragging}
                    />
                    <FeedFooter feedId={feedItem.feedId} initialLikeCount={feedItem.likeCount} />
                </div>
                 ) : (
                    <div></div>
                )}
                <Footer/>
    </div>
  )
}

export default SingleFeed
