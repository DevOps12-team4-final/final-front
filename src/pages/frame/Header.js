import React from 'react'
import '../../scss/framescss/Header.scss';  // 정확한 경로로 수정
function Header({onSelectTab, activeTab}) {


  return (
    <header className="header">
        <div className="header_title_box">
            <p className='header_title'>Logo</p>
            <div className="header_option">
            <input className="header_input" placeholder='검색'></input>
                <button className="material-icons">notifications</button>
                {/* <button className="material-icons">search</button> */}
            </div>
        </div>
    </header>
  );
}

export default Header