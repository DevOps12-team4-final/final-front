import React from 'react'
import '../../scss/framescss/Header.scss';  // 정확한 경로로 수정
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {logout} from '../../apis/userApis';

function Header() {
  const navigate = useNavigate();
  const alarms = useSelector((state) => state.alarmSlice.alarms);
  const dispatch = useDispatch();

  const onClickAlarmLogo =() =>{
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
        <p className="header_title">Hi-we</p>
        <div className="header_option">
          <button
            className="material-icons"
            style={{ color: alarms.length > 0 ? 'yellow' : 'white', position: 'relative' }}
            onClick={onClickAlarmLogo}
          >
            notifications
          </button>
          <button
            className="material-icons"
            style={{ color: 'white' }}
            onClick={onClickLogout}
          >
            logout
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header