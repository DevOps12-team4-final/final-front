import React, { useState, useEffect, useCallback } from 'react';
import '../scss/CommentSection.scss'; // 스타일 파일을 제대로 임포트
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

function CommentSection({ feedId }) {

    const location = useLocation();
    const baseURL = "https://kr.object.ncloudstorage.com/bobaesj/"; // NCloud 기본 URL

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    
    // Redux에서 nickname과 profileImage 가져오기
    const nickname = useSelector(state => state.userSlice.nickname);

    const [userForm] = useState({
        userId: location.state?.userId,
        profileImage: location.state?.profileImage
    });
    
    const [profileImage] = useState(`${baseURL}${userForm.profileImage}`);

     // 댓글 목록 불러오기
         const fetchComments = useCallback(async () => {
        try {
            const token = sessionStorage.getItem('ACCESS_TOKEN');
            const response = await fetch(`http://localhost:9090/feed-comment/feed/${feedId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                console.log("API 응답 데이터:", data);
                setComments(data.items || []);
            } else {
                console.error("댓글 데이터를 불러오는 중 오류 발생: 응답 코드", response.status);
            }
        } catch (error) {
            console.error("댓글 데이터를 불러오는 중 오류 발생:", error);
        }
    }, [feedId]);

    // 모달이 열릴 때마다 댓글 목록 불러오기
    useEffect(() => {
        if (feedId) {
            fetchComments();
        }
    }, [feedId, fetchComments]);


    // 댓글 입력 처리 함수
    const handleInputChange = (e) => {
        setNewComment(e.target.value);
    };

    // 댓글 제출 처리 함수
    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        console.log("Profile Image:", profileImage);  // 전송 전 profileImage 확인
        if (!newComment.trim()) {
            alert("댓글 내용을 입력하세요.");
            return;
        }
    
        try {
            const response = await fetch('http://localhost:3000/feed-comment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`
                },
                body: JSON.stringify({
                    feedId,
                    comment: newComment,
                    profileImage,
                    nickname
                })
            });
    
            if (!response.ok) {
                throw new Error('댓글 작성 중 오류가 발생했습니다.');
            }
    
            const result = await response.json();
            console.log(result);
            const newCommentItem = {
                profileImage: result.item.profileImage ? `${baseURL}${result.item.profileImage}` : null, // 기본 URL 추가 확인
                author: result.item.nickname,
                text: result.item.comment
            };
            console.log(newCommentItem)
            setComments((prevComments) => [...prevComments, newCommentItem]);
    
            setNewComment('');

            
        } catch (error) {
            console.error('댓글 작성 오류:', error);
            alert('댓글 작성에 실패했습니다.');
        }
    }
    return (
        <div className="comment_section">
            {/* 댓글 입력란 */}
            <div className="comment_input_container">
                <textarea
                    className="comment_input"
                    value={newComment}
                    onChange={handleInputChange}
                    placeholder="댓글 달기..."
                />
                <button
                    type="submit"
                    className={`send-button ${!newComment.trim() ? 'disabled' : ''}`}
                    onClick={handleCommentSubmit}
                    disabled={!newComment.trim()}
                >
                    게시
                </button>
            </div>

            {/* 댓글 목록 */}
            <ul className="comment_list">
                {comments.length > 0 ? (
                    comments.map((comment, index) => {
                        console.log(comment); // 각 comment 객체의 구조를 확인

                        return (
                            <li key={index} className="comment_item">
                                <img 
                                    src={comment.profileImage} 
                                    alt="프로필 이미지" 
                                    className="comment_profile_image" 
                                    onError={(e) => e.target.src = "/path/to/default-profile.png"} // 기본 이미지 경로 설정
                                />
                                <span className='comment_nickname'>{nickname}</span>
                                <span className="comment_author">{comment.author}:</span>
                                <span className="comment_text">{comment.text}</span>
                            </li>
                        );
                    })
                ) : (
                    <p>댓글이 없습니다.</p>
                )}
            </ul>
        </div>
    );
}

export default CommentSection;