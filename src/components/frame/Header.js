import React from 'react'
import '../../scss/framescss/Header.scss';  // 정확한 경로로 수정
function Header({onSelectTab, activeTab ,title}) {


  return (
    <header className="header">
        <div className="header_title_box">
            <p className='header_title'>{title}</p>
            <div className="header_icons">
                <button className="material-icons">notifications</button>
                <button className="material-icons">search</button>
            </div>
        </div>
        <div className="header_tab">
            <button className={`first_tab ${activeTab === 'latest' ? 'active' : ''}`}
                    onClick={() => onSelectTab('latest')}>최신</button>
            <button className={`second_tab ${activeTab === 'following' ? 'active' : ''}`}
                    onClick={() => onSelectTab('following')}>팔로잉</button>
        </div>
    </header>
  );
}

export default Header