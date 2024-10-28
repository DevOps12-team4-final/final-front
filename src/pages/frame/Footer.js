import React from 'react'
import '../../scss/framescss/Footer.scss';

function Footer({profileImage}) {
  return (
    <footer className="footer">
      <nav>
        <div className="footer_box">
            <button className="icon_button">
                <i className="material-icons">home</i>
            </button>
            <button className="icon_button">
                <i className="material-icons">search</i>
            </button>
            <button className="icon_button">
                <i className="material-icons">add_circle</i>
            </button>
            <button className="icon_button">
                <i className="material-icons">chat</i>
            </button>
            <button className="icon_button">
                <img src={profileImage} alt="프로필" className='footer_profile'/>
            </button>
        </div>
      </nav>
    </footer>
  );
}
export default Footer