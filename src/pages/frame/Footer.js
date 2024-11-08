import React from 'react'
import '../../scss/framescss/Footer.scss';
import { useNavigate } from 'react-router-dom';
import { usesrS } from 'react-router-dom';
function Footer({profileImage}) {

  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/feed');
  };

  const handleSearchClick = () => {
    navigate('/feedgrid');
  };

  const handlepost = () => {
    navigate('/posts');
  };


    const handlechat = () => {
    navigate('/chat');
  };
  const handlemypage = () => {
    navigate('/MyPage');
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
            <button className="icon_button" onClick={handlepost}>
                <i className="material-icons">add_circle</i>
            </button>
            <button className="icon_button" onClick={handlechat}>
                <i className="material-icons">chat</i>
            </button>
            <button className="icon_button" onClick={handlemypage}>
                <img src={profileImage} alt="프로필" className='footer_profile'/>
            </button>
        </div>
      </nav>
    </footer>
  );
}
export default Footer