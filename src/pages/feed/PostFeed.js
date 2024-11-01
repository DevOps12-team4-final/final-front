import React, {useState} from 'react'
import FeedFooter from '../followingfeed/FeedFooter'
import Footer from '../frame/Footer'
import Header from '../frame/Header'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import '../../scss/Feed.scss'
import SingleFeedContent from '../../components/feed/SingleFeedContet'
import SingleFeedHeader from   '../../components/feed/SingleFeedHeader'

const PostFeed = () => {
  const { profileImage } = useSelector((state) => state.userSlice || {});
  const  nickname = useSelector(state => state.userSlice.nickname)
  // 각 게시물의 슬라이드 인덱스를 저장할 배열
  
  useEffect(()=>{
     // 애니메이션을 적용하기 위해 각 게시물에 클래스 추가
     setTimeout(() => {
        document.querySelectorAll('.feed_box').forEach((element, index) => {
            setTimeout(() => {
                element.classList.add('slide-in'); // 슬라이드 인 클래스를 추가
            }, index * 100); // 각 게시물마다 약간의 지연을 둡니다.
        });
    }, 100);
  },[])



  return (
    <div id='feed'>
                <Header />
                <div className="feed_box">
                    <SingleFeedHeader profileImage={profileImage} nickname={nickname}/>
                    <SingleFeedContent/>
                </div>
                <Footer/>
    </div>
  )
}



export default PostFeed
