import React from 'react'
import '../../scss/framescss/Footer.scss';
import { useNavigate } from 'react-router-dom';

function Footer({profileImage, feedContentRef}) {

  const navigate = useNavigate();

    const handleHomeClick = () => {
        navigate('/feed');

        if(feedContentRef.current){
            feedContentRef.current.scrollTop = 0;
        }
    };

    const handleSearchClick = () => {
        navigate('/feedgrid');
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