import React from 'react'
import '../../scss/framescss/Header.scss';  // 정확한 경로로 수정
function Header() {


  return (
    <header className="header">
        <div className="header_title_box">
            <p className='header_title'>Logo</p>
            <div className="header_option">
                <button className="material-icons" style={{ color: "white" }}>notifications</button>
                <button className="material-icons" style={{ color: "white" }}>logout</button>
            </div>
        </div>
    </header>
  );
}

export default Header