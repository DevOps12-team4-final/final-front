import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const FeedForm = () => {
    const loginUserId = useSelector((state) => state.userSlice.id);
    const [feedFileDtoList, setFeeds] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    useEffect(() => {
        console.log(feedFileDtoList);
    }, [feedFileDtoList]);

    const ClickimgInput = () => {
        document.getElementById("fileInput").click();
    };

    const inputFile = (e) => {
        const files = Array.from(e.target.files);
        const newFeeds = files.map((file, idx) => ({
            feedFileId: feedFileDtoList.length + idx,
            filename: file.name,
            imgUrl: URL.createObjectURL(file),
        }));
        setFeeds((prevFeeds) => [...prevFeeds, ...newFeeds]);
    };

    const post = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        const content = document.getElementById("content").value;
        const feedDto = {
            content: content,
            feedHashtags:[]
        };
    
        // feedDto 객체를 JSON 문자열로 변환하고 Blob으로 감싸서 formData에 추가
        formData.append('feedDto', new Blob([JSON.stringify(feedDto)], { type: 'application/json' }));
    
        // 각 파일을 formData에 추가
        feedFileDtoList.forEach((file) => {
            formData.append('uploadFiles', file);
        });
    
        try {
            const response = await axios.post(`http://localhost:9090/feeds/post`, formData, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`,
                    // Content-Type을 설정하지 않아 axios가 자동으로 설정하게 합니다.
                },
            });
            alert("업로드가 완료되었습니다!");
        } catch (error) {
            console.error("Error uploading feed:", error);
            alert("업로드 중 오류가 발생했습니다. 다시 시도해 주세요.");
        }
    };
    
    return (
        <form className="feed_content" style={{ alignItems: "left", padding: "10px" }} onSubmit={post}>
            <textarea
                type="text"
                id="content"
                rows={5}
                cols={30}
                style={{ border: "none", borderRadius: "10px", fontSize: "18px", fontWeight: "bold" }}
                placeholder="내용을 입력해주세요"
            ></textarea>
            <input
                type="file"
                multiple
                id="fileInput"
                style={{ display: "none" }}
                onChange={inputFile}
            />
            {feedFileDtoList.length > 0 ? (
                <div className="carousel" onClick={ClickimgInput}>
                    <div
                        className="carousel-inner"
                        style={{
                            display: 'flex',
                            transition: 'transform 0.5s ease-in-out',
                            transform: `translateX(-${currentIndex * 375}px)`,
                            width: `${feedFileDtoList.length * 375}px`,
                        }}
                    >
                        {feedFileDtoList.map((file) => (
                            <img
                                key={file.feedFileId}
                                src={file.imgUrl}
                                alt={`게시물 이미지 ${file.feedFileId}`}
                                style={{ width: '355px', height: '355px' }}
                            />
                        ))}
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
                </div>
            ) : (
                <div
                    style={{ width: '355px', height: '375px' }}
                    onClick={ClickimgInput}
                />
            )}
            <button type="submit">POST</button>
        </form>
    );
};

export default FeedForm;