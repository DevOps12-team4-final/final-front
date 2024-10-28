import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useLocation  } from 'react-router-dom';
import Header from '../frame/Header';
import Footer from '../frame/Footer';
import '../../scss/FeedGrid.scss';

function FeedGrid() {

    const location = useLocation();
    const baseURL = "https://kr.object.ncloudstorage.com/bobaesj/"; // NCloud 기본 URL

    const [feed, setFeed] = useState([]); // 게시물 데이터
    const [page, setPage] = useState(0); // 현재 페이지 번호
    const [hasNextPage, setHasNextPage] = useState(false); // 다음 페이지 여부
    const [loading, setLoading] = useState(false); // 로딩 상태
    const observerRef = useRef();

    // 중복된feedId를 가진 항목을 필터링
    const uniqueFeeds = feed.filter((feedItem, index, self) => 
        index === self.findIndex((item)=>item.feedId === feedItem.feedId)
    );

    const fetchLatestFeed = useCallback(async(page) => {
        setLoading(true);

        try{
            const token = sessionStorage.getItem('ACCESS_TOKEN');
            const response = await fetch(`/feeds/latest?page=${page}&size=24`, {
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
        fetchLatestFeed(page);
    }, [page, fetchLatestFeed]);

    return (
        <div id='feedgrid_body'>
        <div className='feedgrid_container'>
            <Header />
                <main className='feedgrid_content_box'>
                    {uniqueFeeds && uniqueFeeds.length > 0 && uniqueFeeds.map((feedItem) => ( 
                        <div key={feedItem.feedId} className='feedgrid_box'>
                            {feedItem.feedFileDtoList.length > 0 && (
                                <img
                                    src={`${baseURL}${feedItem.feedFileDtoList[0].filepath}${feedItem.feedFileDtoList[0].newfilename}`}
                                    alt={`Feed by ${feed.nickname}`}
                                    className='feedgrid_image'
                                />
                            )}
                        </div>
                    ))}
                </main>

                {hasNextPage ? (
                    <div className='spinner-container'>
                        <div ref={observerRef} className="spinner"></div>
                    </div>
                ) : null}
            <Footer profileImage={`${baseURL}${location.state?.profileImage}`} />
        </div>
        </div>
    );
}

export default FeedGrid