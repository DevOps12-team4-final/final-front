import { useLocation } from 'react-router-dom';
import Footer from '../pages/frame/Footer'
import Header from '../pages/frame/Header';

function Post() {
  const location = useLocation();
  const user = location.state; // user 데이터를 state로부터 가져오기

  return (
    <div>
      <Header/>
      <h1>게시물 페이지</h1>
      
      {user && <p>{user.nickname}님, 환영합니다!</p>}
      <Footer profileImage={null} />
    </div>
    
  );
}

export default Post;