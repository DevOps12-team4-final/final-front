import React from 'react'
import '../../scss/framescss/Footer.scss';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
function Footer({feedContentRef}) {
  
  const navigate = useNavigate();
  const profileImage = useSelector(state => state.userSlice.profileImage)

  const handleHomeClick = () => {
    navigate('/feeds');

    if(feedContentRef != null && feedContentRef != undefined &&  feedContentRef.current){
        feedContentRef.current.scrollTop = 0;
    }
};

  const handleSearchClick = () => {
    navigate('/searchPage');
  };

  const handlepost = () => {
    navigate('/posts');
  };


    const handlechat = () => {
    navigate('/chatBoard');
  };
  
  const handleMyPageClick = () => {
    navigate('/mypage');
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
            <button className="icon_button" onClick={handleMyPageClick}>
                <img src={profileImage} alt="프로필" className='footer_profile'/>
            </button>
        </div>
      </nav>
    </footer>
  );
}
export default Footer