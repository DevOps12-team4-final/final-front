import React, {useRef, useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import '../scss/SearchPage.scss';
import axios from 'axios';
import debounce from 'lodash/debounce';
import Header from './frame/Header'
import Footer from './frame/Footer';
function SearchPage() {
    const baseURL = "https://kr.object.ncloudstorage.com/bobaesj/";
    const { profileImage } = useSelector((state) => state.userSlice || {});
    const contentRef = useRef(null);
    const [searchResults, setSearchResults] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [focused, setFocused] = useState(false);
    const fetchSearchResults = async (keyword) => {
        try {
            const token = sessionStorage.getItem('ACCESS_TOKEN');
            const response = await axios.get(`/search`, {
                params: { searchKeyword: keyword },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setSearchResults(response.data.itemsMap.USER || []);
        } catch (error) {
            console.error("검색 실패:", error);
        }
    };
    // useEffect에서 debounce 적용
    useEffect(() => {
        // debounce된 fetch 함수를 정의
        const debouncedFetch = debounce((keyword) => {
            if (keyword) fetchSearchResults(keyword);
        }, 500);
        // searchText가 변경될 때 debouncedFetch 실행
        if (searchText) {
            debouncedFetch(searchText);
        }
        // cleanup 함수로 debounce 취소
        return () => {
            debouncedFetch.cancel();
        };
    }, [searchText]);
    const handleCancelClick = () => {
        setSearchText('');
        setSearchResults([]);
        setFocused(false);
    };
    const roomProfileImg = (user, index) => {
        if (user.profileImage) {
            return `${baseURL}${user.profileImage}`;
        }
        return require('../images/default-profile.jpg'); // 기본 프로필 이미지
    };
    
    return (
        <div id='search'>
            <div className='search-container'>
                <Header />
                <div className='input-container-box'>
                    <div className='input-container'></div>
                    <div className="input-container">
                        <input type="text"
                                placeholder="검색"
                                value={searchText}
                                onFocus={() => setFocused(true)}
                                onBlur={() => !searchText && setFocused(false)}
                                onChange={(e) => setSearchText(e.target.value)}/>
                        {focused && (
                        <button className="cancel-button" onMouseDown={handleCancelClick}>
                            취소
                        </button>
                        )}
                    </div>
                </div>
                {/* 검색 결과 표시 */}
                <div className="search-results">
                    {searchResults.map((user, index) => (
                        <div key={index} className="user-item">
                            <img src={roomProfileImg(user,index)} alt="프로필" className="user-profile-image" />
                            <div className="user-info">
                                <span className="user-nickname">{user.nickname}</span>
                            </div>
                        </div>
                    ))}
                </div>             
                <Footer profileImage={profileImage} contentRef={contentRef}/>
            </div>
        </div>
    )
}
export default SearchPage