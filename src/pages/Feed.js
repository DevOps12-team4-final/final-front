import React, { useCallback, useEffect, useState, useRef } from 'react';
import { useLocation,useNavigate  } from 'react-router-dom';
import Header from './frame/Header';
import Footer from './frame/Footer';
import CommentSection from './CommentSection'; // 새로 만든 댓글 컴포넌트 가져오기
import '../scss/Feed.scss';


function Feed() {

    const location = useLocation();
    const baseURL = "https://kr.object.ncloudstorage.com/bobaesj/"; // NCloud 기본 URL
    
    // 각 게시물의 슬라이드 인덱스를 저장할 배열
    const [currentIndexes, setCurrentIndexes] = useState([]);
    // 현재 드래그 중인 게시물 인덱스 상태
    const [currentFeedIndex, setCurrentFeedIndex] = useState(0);

    const [userForm] = useState({
        userId: location.state?.userId,
        profileImage: location.state?.profileImage,
    });

    const [profileImage] = useState(`${baseURL}${userForm.profileImage}`);
    
    // 드래그 상태 관리
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);

    const [feed, setFeed] = useState([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(false);
    // 내가 호출했던 페이지의 히스토리를 저장
    const [pageParams, setPageParams] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 관리
    const [activeFeedId, setActiveFeedId] = useState(null); // 현재 활성화된 댓글의 feedId

    //이동용 navi
    const navigate = useNavigate()

    // 모달 열기
    const openModal = (feedId) => {
        setActiveFeedId(feedId);
        setIsModalOpen(true);
    };

    // 모달 닫기
    const closeModal = () => {
        setIsModalOpen(false);
        // setActiveFeedId(null); // feedId 초기화를 피해서 상태 유지
        setActiveFeedId(null);
    };

    const observerRef = useRef();
    console.log(observerRef);

    const fetchFeed = useCallback(async(page) => {
        if(pageParams.includes(page)) return;
        setLoading(true);

        try{
            const token = sessionStorage.getItem('ACCESS_TOKEN');
            const response = await fetch(`/feeds?page=${page}&size=10`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            })
            
            console.log(token)
            const data = await response.json();
            setFeed((prevFeed) => {
                const newFeeds = data.item.content.filter(feedItem => 
                    !prevFeed.some(existingItem => existingItem.feedId === feedItem.feedId)
                );
                return [...prevFeed, ...newFeeds];
            });
            setPageParams((prev) => [...prev, page]);
            setHasNextPage(data.item.pageable.pageNumber < data.item.totalPages);

            console.log("data", data);
        }catch(error){
            console.log("error", error);
        }finally {
            // 반드시 요청이 완료되면 로딩 상태를 false로 설정
            setLoading(false);
        }
    },[pageParams]);

    // 중복된feedId를 가진 항목을 필터링
    const uniqueFeeds = feed.filter((feedItem, index, self) => 
        index === self.findIndex((item)=>item.feedId === feedItem.feedId)
    );

    useEffect(()=>{
        // 관찰하고싶은 배열값 가져온다
        const observer = new IntersectionObserver((entries)=>{
            const firstEntry = entries[0]
            // 화면에 들어갔니?
            if(firstEntry.isIntersecting && hasNextPage && !loading){
                setPage((prevPage) => prevPage + 1);
            }
        },{ rootMargin: '100px' });
        const currentObserver = observerRef.current;
        if(currentObserver) observer.observe(currentObserver);
        return ()=>{
            if(currentObserver) observer.unobserve(currentObserver);
        }
    },[hasNextPage, loading]);

    useEffect(()=>{
        fetchFeed(page);
    },[page, fetchFeed])

    useEffect(()=>{
        if(feed.length > 0){
            setCurrentIndexes(new Array(feed.length).fill(0));
        };
    }, [feed]);


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
    }


    //이동 하기 개별 Feed 페이지로
    const naviFeed = (feedId) =>{
        navigate(`/feed/${feedId}`)
    }
    //이동하기 유저페이지로
    const naviUser = (userId) =>{
        navigate(`/userPage/${userId}`)
    }

  return (
    <div className='feed_container'>
        <Header />
        <main className="feed_content_box">
            {uniqueFeeds && uniqueFeeds.length > 0 && uniqueFeeds.map((feedItem, feedIndex) => (
            <div key={feedItem.feedId} className="feed_box">
                {/* <!-- 게시글 헤더 --> */}
                <div className="feed_header">
                    <div className="user-info">
                    <img 
                        src={`${baseURL}${feedItem.profileImage}`} 
                        alt="프로필 사진" 
                        onClick={naviUser(feedItem.userId)}
                    />
                        <div>
                            <strong>{feedItem.nickname}</strong><br />
                            <span>{timeAgo(feedItem.regdate)}</span>
                        </div>
                    </div>
                    <button className="feed_follow_button">팔로우</button>
                </div>
            
                {/* <!-- 게시글 본문 --> */}
                <div className="feed_content">
                    <p>{feedItem.content}</p>

                    {/* 캐러셀 구현 */}
                    {feedItem.feedFileDtoList?.length > 0 && (
                        <div className="carousel"
                        onMouseDown={(e) => handleMouseDown(e, feedIndex)} // 현재 인덱스 전달
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}>
                            <div className="carousel-inner" style={{
                                display: 'flex',
                                transition: 'transform 0.5s ease-in-out',
                                transform: `translateX(-${currentIndexes[feedIndex] * 600}px)`,
                                width: `${feedItem.feedFileDtoList.length * 600}px`
                            }}>
                            {feedItem.feedFileDtoList.map((file) => (
                                <img
                                    key={file.feedFileId}
                                    src={`${baseURL}${file.filepath}${file.filename}`}
                                    alt={`게시물 이미지 ${file.feedFileId}`}
                                    style={{ width: '600px', height: '600px',}} // 이미지 크기 설정
                                />
                            ))}
                        </div>

                            {/* 점 네비게이션 */}
                            <div className="dots-container">
                                {feedItem.feedFileDtoList.map((_, imageIndex) => (
                                    <span 
                                        key={`${feedItem.feedId}-${imageIndex}`}
                                        className={`dot ${currentIndexes[feedIndex] === imageIndex ? 'active' : ''}`}
                                        onClick={() => goToSlide(feedIndex, imageIndex)}
                                    >
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>


            
                {/* <!-- 게시글 푸터 --> */}
                <div className="feed_footer">
                    <p>회원님 외 {feedItem.likeCount}명이 응원중입니다.</p>
                    <span>댓글 0</span>
                </div>

                {/* <!-- 게시글 액션 --> */}
                <div className="feed_actions">
                  <div>
                    <span className="material-symbols-outlined">
                        cheer
                    </span>
                    <span>응원</span>
                  </div>

                        <div onClick={() => openModal(feedItem.feedId)}>
                            <i className="material-icons">chat_bubble_outline</i>
                            <span>댓글</span>
                        </div>
                    
                  <div>
                    <i className="material-icons">fitness_center</i>
                    <span>운동</span>
                  </div>
                </div>
            </div>
            ))}
            <h1 ref={observerRef} style={{ width: 0, height: 0, overflow: 'hidden' }}>{""}</h1>
        </main>
        <Footer profileImage={profileImage}/>

        {/* 댓글 모달 */}
        {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <span className="close-modal" onClick={closeModal}>X</span>
                        {/* 댓글 섹션 모달 */}
                        <CommentSection feedId={activeFeedId} />
                    </div>
                </div>
            )}
    </div>
  )
}

export default Feed