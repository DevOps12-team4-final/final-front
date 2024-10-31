import React from 'react'
import '../../scss/framescss/Header.scss';  // 정확한 경로로 수정
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../apis/userApis';
function Header() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = async () => {
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
                <p className='header_title'>Hi-we</p>
                <div className="header_option">
                    <button className="material-icons" style={{ color: "white" }}>notifications</button>
                    <button className="material-icons" style={{ color: "white" }} onClick={handleLogout}>logout</button>
                </div>
            </div>
        </header>
    );
}

export default Header