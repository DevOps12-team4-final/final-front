import React from 'react'
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../apis/userApis';

function Logout() {

  const location = useLocation();
  const user = location.state;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {

    try {
      dispatch(logout()).unwrap();
      console.log('로그아웃 성공');

      navigate('/');
    } catch (error) {

      console.error('로그아웃 실패: ', error);
      alert('로그아웃 중 오류가 발생했습니다.');
    }
  };

  return (
    <div>
      {user && <p>{user.nickname}님, 환영합니다!</p>}
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  )
}

export default Logout