import React from 'react'
import '../../scss/framescss/Header.scss';  // 정확한 경로로 수정
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {logout} from '../../apis/userApis';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClickalarmLogo =() =>{
    navigate('/alarmList')
  }

  const onClickLogout = async () => {
    try{
        await dispatch(logout()).unwrap();
        navigate('/');
    } catch(error) {
        console.error('로그아웃 실패: ', error);
    }
  }

  
  return (
    <header className="header">
        <div className="header_title_box">
            <p className='header_title'>Logo</p>
            <div className="header_option">
                <button className="material-icons" style={{ color: "white" }} onClick={onClickalarmLogo}>notifications</button>
                <button className="material-icons" style={{ color: "white" }} onClick={onClickLogout}>logout</button>
            </div>
        </div>
    </header>
  );
}

export default Header