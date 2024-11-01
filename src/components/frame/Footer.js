import React from 'react'
import '../../scss/framescss/Footer.scss';

function Footer({profileImage}) {
  return (
    <footer className="footer">
      <nav>
        <div className="footer_box">
            <button className="icon_button">
                <i className="material-icons">fitness_center</i>
                <span>운동</span>
            </button>
            <button className="icon_button">
                <i className="material-icons">people</i>
                <span>피드</span>
            </button>
            <button className="icon_button">
                <i className="material-icons">add_circle</i>
                <span>등록</span>
            </button>
            <button className="icon_button">
                <i className="material-icons">chat</i>
                <span>채팅</span>
            </button>
            <button className="icon_button">
                <img src={profileImage} alt="프로필" className='footer_profile'/>
                <span>마이</span>
            </button>
        </div>
      </nav>
    </footer>
  );
}
export default Footer