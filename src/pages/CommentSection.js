import React, { useCallback, useEffect, useState } from 'react';
import '../scss/CommentSection.scss'; // 스타일 파일을 제대로 임포트
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import defaultProfileImage from '../images/default-profile.jpg';
function CommentSection({ feedId, closeModal }) { // closeModal 추가
    const location = useLocation();
    const baseURL = "https://kr.object.ncloudstorage.com/bobaesj/";

    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    // Redux에서 nickname과 profileImage 가져오기
    const nickname = useSelector(state => state.userSlice.nickname);

    const [userForm] = useState({
        userId: location.state?.userId,
        profileImage: location.state?.profileImage
    });

    const [profileImage] = useState(`${baseURL}${userForm.profileImage}`);

    // 댓글 목록 불러오기 함수
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
                console.log("API 전체 응답 데이터:", data); // 전체 응답 데이터 확인
                setComments(data); // 댓글 데이터를 설정합니다.
            } else {
                console.error("댓글 데이터를 불러오는 중 오류 발생:", response.status);
            }
        } catch (error) {
            console.error("댓글 데이터를 불러오는 중 오류 발생:", error);
        }
    }, [feedId]);

    // 모달이 열릴 때 댓글 목록 불러오기
    useEffect(() => {
        if (feedId) {
            fetchComments();
            console.log("fetchComments 호출됨 - feedId:", feedId);
        }
    }, [feedId, fetchComments]);

    // 댓글 입력 처리 함수
    const handleInputChange = (e) => {
        setNewComment(e.target.value);
    };

    // 댓글 제출 처리 함수
    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) {
            alert("댓글 내용을 입력하세요.");
            return;
        }

        try {
            const response = await fetch('http://localhost:9090/feed-comment', { // POST URL 수정 확인
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem('ACCESS_TOKEN')}`
                },
                body: JSON.stringify({
                    feedId,
                    comment: newComment,
                    profileImage
                })
            });

            if (!response.ok) {
                throw new Error('댓글 작성 중 오류가 발생했습니다.');
            }

            const result = await response.json();
            const newCommentItem = {
                profileImage: result.item.profileImage ? `${result.item.profileImage}` : null,
                nickname: result.item.nickname,
                comment: result.item.comment
            };
            setComments((prevComments) => [...prevComments, newCommentItem]);
            setNewComment('');

        } catch (error) {
            console.error('댓글 작성 오류:', error);
            alert('댓글 작성에 실패했습니다.');
        }
    };

    const roomProfileImg = (user, index) => {
        if (user.profileImage) {
            return `${baseURL}${user.profileImage}`;
        }
        return ('defaultProfileImage'); // 기본 프로필 이미지
    };

    return (
        <div className="comment_section">
            {/* 댓글 목록 */}
            <ul className="comment_list">
                {comments.length > 0 ? (
                    comments.map((comment, index) => (
                        <li key={index} className="comment_item">
                            <img 
                                src={roomProfileImg(comment, index)} 
                                alt="프로필 이미지" 
                                className="comment_profile_image" 
                            />
                            <span className='comment_nickname'>{comment.nickname}</span>
                            <span className="comment_text">{comment.comment}</span>
                        </li>
                    ))
                ) : (
                    <p>댓글이 없습니다.</p>
                )}
            </ul>

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
                >게시</button>
                <button className="close-button" onClick={(e)=>e.closeModal}> 
                    닫기
                </button>
            </div>
        </div>
    );
}

export default CommentSection;
