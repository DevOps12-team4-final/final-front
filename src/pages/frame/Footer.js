import React from 'react'
import '../../scss/framescss/Footer.scss';
import { useNavigate } from 'react-router-dom';

function Footer({profileImage, contentRef}) {

  const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate('/feed');

        if(contentRef.current){
            contentRef.current.scrollTop = 0;
        }
    };

    const handleSearchClick = () => {
        navigate('/searchPage');

        if(contentRef.current){
            contentRef.current.scrollTop = 0;
        }
    };

    return (
        <footer className="footer">
        <nav>
            <div className="footer_box">
                <button className="icon_button" onClick={handleHomeClick}>
                    <i className="material-icons">home</i>
                </button>
                <button className="icon_button" onClick={handleSearchClick}>
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