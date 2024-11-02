import React ,{useState} from 'react'
import '../../scss/Feed.scss'

function FeedHeader({profileImage, nickname}) {
  

    return (
        <div className='feed_header'>
            <div className='user_info'>
                <div>
                    <img className='user-info-img'  src={profileImage} alt='프로필 사진'/>
                    </div>
                  
            </div> 
            
            <div className='feed_header_box'>
                 <strong>{nickname}</strong>
            </div>
        </div>
    )
}

export default FeedHeader