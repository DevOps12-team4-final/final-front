import React from 'react'
import '../../scss/framescss/Header.scss';  // 정확한 경로로 수정
function Header() {

  




  return (
    <header className="header">
        <div className="header_title_box">
            <p className='header_title'>Logo</p>
            <div className="header_icons">
                <button className="material-icons">notifications</button>
                <button className="material-icons">search</button>
            </div>
        </div>
        <div className="header_tab">
            <button className="first_tab">최신</button>
            <button className="second_tab">팔로잉</button>
        </div>
    </header>
  );
}

export default Header