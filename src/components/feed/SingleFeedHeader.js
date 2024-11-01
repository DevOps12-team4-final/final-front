import React ,{useState} from 'react'
function FeedHeader({profileImage, nickname}) {
  

    return (
        <div className='feed_header'>
            <div className='user_info'>
                <img className='user-info-img'  src={profileImage} alt='프로필 사진'/>
                <div>
                    <strong>{nickname}</strong><br />
                </div>
            </div>
            <div className='feed_header_box'>
            </div>
        </div>
    )
}

export default FeedHeader