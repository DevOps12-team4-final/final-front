import Footer from "./frame/Footer";
import "../scss/MyPage.scss";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { TfiLayoutGrid3 } from "react-icons/tfi";
import { AiOutlineSetting } from "react-icons/ai";
import { FaRegBookmark } from "react-icons/fa6";
import Header from "./frame/Header";

const MyPage = () => {

  const baseURL = "https://kr.object.ncloudstorage.com/bobaesj/";
  const [myPage, setMyPage] = useState(0);
  const [myFeeds, setMyFeeds] = useState("");
  const { id } = useParams();
  const { profileImage } = useSelector((state) => state.userSlice || {});
  const userNickname = useSelector((state) => state.userSlice.nickname);

  const findById = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:9090/users/my-page`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
        },
      });
      console.log(response.data.item);

      let userDetail = response.data.item;

      setMyPage(userDetail);
    } catch (e) {
      alert("에러가 발생했습니다.");
    }
  }, [id]);

  const findFeedById = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:9090/feeds/my-page`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
        },
      });

      const myFeeds = response.data.item;

      setMyFeeds(myFeeds);
    } catch (e) {
      alert("오류로 게시물을 가져올 수 없습니다.");
    }
  }, []);


  useEffect(() => {
    findById();
    findFeedById();
  }, []);

  return (
    <section className="whole-section">
      <Header/>
      <main className="content">
        <div className="mypage-frame">
          <header className="mypage-header">
            <section className="user-image-section">
              <img
                className="user-image"
                src={profileImage}
                alt="프로필 사진"
              />
            </section>
            <section className="user-information-frame">
              <section className="user-information">
                <div className="user-nickname">{userNickname}</div>
                <div className="profile-edit">프로필 편집</div>
                <div className="system-setting">
                  <AiOutlineSetting />
                </div>
              </section>
              <section className="user-follower-cnt">
                <div className="follower-cnt">
                  {`팔로우 ${myPage.followerCount}`}
                </div>
                <div className="following-cnt">
                  {`팔로잉 ${myPage.followingCount}`}
                </div>
              </section>
            </section>
          </header>
          <section className="user-comment-frame">
            자기소개<br></br>
            <section className="user-comment">{`${myPage.statusMessage}`}</section>
          </section>
          <section className="mypage-bar-frame">
            <div className="mypage-bar">
              <a aria-selected="true" className="feed-tag" href="" role="tab">
                <TfiLayoutGrid3 style={{ color: "black" }} />
              </a>
              <a aria-selected="false" className="b-tag" href="" role="tab">
                <FaRegBookmark style={{ color: "black" }} />
              </a>
            </div>
          </section>
          <section className="bar-content-section">
            <div className="bar-content-grid-container">
              {myFeeds &&
                myFeeds.length > 0 &&
                myFeeds.map((feedItem) => (
                  <div key={feedItem.feedId} className="grid-item">
                    {feedItem.feedFileDtoList.length > 0 && (
                      <img
                        src={`${baseURL}${feedItem.feedFileDtoList[0].filepath}${feedItem.feedFileDtoList[0].filename}`}
                        // alt={`Feed by ${feedItem.nickname}`}
                        className="grid-item"
                      />
                    )}
                  </div>
                ))}
            </div>
          </section>
        </div>
      </main>
      <Footer profileImage={profileImage} />
    </section>
  );
};

export default MyPage;
