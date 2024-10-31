import { useLocation } from 'react-router-dom';
import Header from './frame/Header';
import Footer from './frame/Footer';

import '../scss/Post.scss';

function Post() {
  const location = useLocation();
  const user = location.state; // user 데이터를 state로부터 가져오기

  return (
    <div id='post'>
      <div className='post_container'>
        <Header/>
          <div classNmae='post_context'>
            <h1>게시물 페이지</h1>
            {user && <p>{user.nickname}님, 환영합니다!</p>}
          </div>
        <Footer/>
      </div>
    </div>
  );
}

export default Post;