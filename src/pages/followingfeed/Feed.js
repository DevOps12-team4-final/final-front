import React, { useCallback, useEffect, useState, useRef } from 'react';
// import { useLocation  } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Header from '../frame/Header';
import Footer from '../frame/Footer';
import '../../scss/Feed.scss';
import FeedHeader from './FeedHeader';
import FeedContent from './FeedContent';
import FeedFooter from './FeedFooter';
import CommentSection from '../CommentSection'; // 새로 만든 댓글 컴포넌트 가져오기

function Feed() {

    // const location = useLocation();
    const baseURL = "https://kr.object.ncloudstorage.com/bobaesj/"; // NCloud 기본 URL

    const { profileImage } = useSelector((state) => state.userSlice || {});
    // 각 게시물의 슬라이드 인덱스를 저장할 배열
    const [currentIndexes, setCurrentIndexes] = useState([]);
    // 현재 드래그 중인 게시물 인덱스 상태
    const [currentFeedIndex, setCurrentFeedIndex] = useState(0);

    // const [userForm] = useState({
    //     userId: location.state?.userId,
    //     profileImage: location.state?.profileImage,
    // });

    // const [profileImage] = useState(`${baseURL}${userForm.profileImage}`);

    // 드래그 상태 관리
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);

    const [feed, setFeed] = useState([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(false);
    const observerRef = useRef();
    
    const [isBlocked, setIsBlocked] = useState(false); 
    const feedContentRef = useRef(null);


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isChatOpen, setIsChatlOpen] = useState(false);
    const [activeFeedId, setActiveFeedId] = useState();
    
    // 모달 열기
    const openChatModal = (feedId) => {
        setActiveFeedId(feedId);
        setIsChatlOpen(true);
    };
    const closeChatModal = () => {
        console.log("AAA")
        setIsChatlOpen(false);
    };

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const fetchFeed = useCallback(async(page) => {
        setLoading(true);

        try{
            const token = sessionStorage.getItem('ACCESS_TOKEN');
                const response = await fetch(`/feeds/latest?page=${page}&size=10`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })

            const data = await response.json();
            setFeed((prevFeed) => {
                const newFeeds = data.item.content.filter(feedItem => 
                    !prevFeed.some(existingItem => existingItem.feedId === feedItem.feedId)
                );
                return [...prevFeed, ...newFeeds];
            });
            setHasNextPage(data.item.page.number < data.item.page.totalPages);

            console.log("data", data);
        }catch(error){
            console.log("error", error);
        }finally {
            setLoading(false);
        }
    },[]);

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

    // 중복된feedId를 가진 항목을 필터링
    const uniqueFeeds = feed.filter((feedItem, index, self) => 
        index === self.findIndex((item)=>item.feedId === feedItem.feedId)
    );

    useEffect(()=>{
        // 관찰하고싶은 배열값 가져온다
        const observer = new IntersectionObserver((entries)=>{
            const firstEntry = entries[0]
            // 화면에 요소가 들어오고, 다음 페이지가 있고, 로딩 중이 아닐때
            if(firstEntry.isIntersecting && hasNextPage && !loading){
                setPage((prevPage) => prevPage + 1);
            }
        },{ rootMargin: '100px' });

        const currentObserver = observerRef.current;
        if(currentObserver && hasNextPage) {
            observer.observe(currentObserver);
        }

        return ()=>{
            if(currentObserver) observer.unobserve(currentObserver);
        }
    },[hasNextPage, loading]);

    useEffect(()=>{
        console.log(profileImage);
        fetchFeed(page);
    }, [page, fetchFeed]);

    // 슬라이드 점 네비게이션 클릭 시 동작
    const goToSlide = (feedIndex, imageIndex) => {
        // 기존 인덱스 복사
        const newIndexes = [...currentIndexes];
        // 해당 게시물의 슬라이드 인덱스만 변경
        newIndexes[feedIndex] = imageIndex;
        // 새로운 인덱스 배열로 상태 업데이트
        setCurrentIndexes(newIndexes);
    };

    // 마우스 이벤트 핸들러
    const handleMouseDown = (e, feedIndex) => {
        setIsDragging(true);
        setStartX(e.clientX);
        setCurrentFeedIndex(feedIndex); // 현재 게시물 인덱스 저장
    };

    const handleMouseMove = (e) => {
        if (!isDragging) return;
    
        const deltaX = startX - e.clientX; // 이동한 거리
        const feedIndex = currentFeedIndex; // 현재 게시물 인덱스 사용
        
        if (deltaX > 50 && currentIndexes[feedIndex] < feed[feedIndex].feedFileDtoList.length - 1) {
            goToSlide(feedIndex, currentIndexes[feedIndex] + 1);
            setIsDragging(false);
        } else if (deltaX < -50 && currentIndexes[feedIndex] > 0) {
            goToSlide(feedIndex, currentIndexes[feedIndex] - 1);
            setIsDragging(false);
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
        setStartX(0);
    };


    useEffect(() => {
        if (feed.length > 0) {
            setCurrentIndexes(new Array(feed.length).fill(0)); // 각 게시물에 대해 슬라이드 인덱스를 0으로 초기화

            // 애니메이션을 적용하기 위해 각 게시물에 클래스 추가
            setTimeout(() => {
                document.querySelectorAll('.feed_box').forEach((element, index) => {
                    setTimeout(() => {
                        element.classList.add('slide-in'); // 슬라이드 인 클래스를 추가
                    }, index * 100); // 각 게시물마다 약간의 지연을 둡니다.
                });
            }, 100);
        }
    }, [feed]);

  return (
    <div id='feed'>
         
            <Header />
      
           
        <main className="feed_content_box" ref={feedContentRef}>
                {uniqueFeeds && uniqueFeeds.length > 0 && uniqueFeeds.map((feedItem, feedIndex) => (
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
                        currentIndex={currentIndexes[feedIndex]}
                        onMouseDown={(e) => handleMouseDown(e, feedIndex)}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        goToSlide={(imageIndex) => goToSlide(feedIndex, imageIndex)}
                        isDragging={isDragging}
                    />
                
                    <FeedFooter feedId={feedItem.feedId} initialLikeCount={feedItem.likeCount} onChatClick={openChatModal} />
                </div>
                ))}
                {/*차단모달*/}
                {isModalOpen && (
                    <>
                        <div className="modal_overlay" onClick={toggleModal}></div>
                        <div className={`slide_modal ${isModalOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
                            <div className="modal_content">
                                <button onClick={() => handleBlockToggle(feed[0].userId)}>
                                    {isBlocked ? "차단 해제" : "계정 차단"}
                                </button>
                                <button onClick={() => console.log("신고")}>신고</button>
                            </div>
                        </div>
                    </>
                )}

                {/* 댓글 모달 */}
                {isChatOpen && (
                     <div className="modal_overlay" onClick={closeChatModal}>
                        <div className="modal_content" onClick={(e) => e.stopPropagation()}>
                        <span className="close-modal" onClick={closeChatModal}>X</span>
                        {/* 댓글 섹션 모달 */}
                        <CommentSection feedId={activeFeedId} closeModal={closeChatModal} />
                        </div>
                     </div>
                )}

                {/* 삼항 연산자로 spinner를 조건부 렌더링 */}
                {hasNextPage ? (
                    <div className='spinner-container'>
                        <div ref={observerRef} className="spinner"></div>
                    </div>
                ) : null}
            </main>
            <Footer profileImage={profileImage} feedContentRef={feedContentRef} />

        </div>
  )
}

export default Feed