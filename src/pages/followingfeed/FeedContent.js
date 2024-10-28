import React from 'react'

function FeedContent({content, feedFileDtoList, currentIndex, onMouseDown, onMouseMove, onMouseUp, goToSlide, isDragging}) {

    const baseURL = "https://kr.object.ncloudstorage.com/bobaesj/"; // NCloud 기본 URL

     return (
        <div className="feed_content">
            <p>{content}</p>

            {/* 캐러셀 구현 */}
            {feedFileDtoList?.length > 0 && (
                <div className="carousel"
                    onMouseDown={onMouseDown}
                    onMouseMove={onMouseMove}
                    onMouseUp={onMouseUp}
                    style={{ cursor: isDragging ? 'grabbing' : 'grab' }}>
                    <div className="carousel-inner" style={{
                        display: 'flex',
                        transition: 'transform 0.5s ease-in-out',
                        transform: `translateX(-${currentIndex * 600}px)`,
                        width: `${feedFileDtoList.length * 600}px`
                    }}>
                        {feedFileDtoList.map((file) => (
                            <img
                                key={file.feedFileId}
                                src={`${baseURL}${file.filepath}${file.newfilename}`}
                                alt={`게시물 이미지 ${file.feedFileId}`}
                                style={{ width: '600px', height: '600px',}} // 이미지 크기 설정
                            />
                        ))}
                    </div>

                    {/* 점 네비게이션 */}
                    <div className="dots-container">
                        {feedFileDtoList.map((_, imageIndex) => (
                            <span
                                key={imageIndex}
                                className={`dot ${currentIndex === imageIndex ? 'active' : ''}`}
                                onClick={() => goToSlide(imageIndex)}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}

export default FeedContent