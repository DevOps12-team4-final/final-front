import Footer from "./frame/Footer";
import "../scss/MyPage.scss";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { TfiLayoutGrid3 } from "react-icons/tfi";
import { AiOutlineSetting } from "react-icons/ai";
import { FaRegBookmark } from "react-icons/fa6";

const MyPage = () => {
  // ----------------- //
  // 필요한 상태값 초기 세팅 //
  // ----------------- //
  const baseURL = "https://kr.object.ncloudstorage.com/bobaesj/";

  const { profileImage } = useSelector((state) => state.userSlice || {});

  const [myPage, setMyPage] = useState(0);
  const [myFeed, setMyFeed] = useState("");

  const { id } = useParams();
  const loginUserId = useSelector((state) => state.userSlice.id);
  const userNickname = useSelector((state) => state.userSlice.nickname);

  const findById = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:9090/users/my-page`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
        },
      });

      let userDetail = response.data.item;

      console.log(userDetail);
      setMyPage(userDetail);
    } catch (e) {
      alert("에러가 발생했습니다.");
    }
  }, [id]);

  const findFeedById = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:9090/feeds`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
        },
      });

      const myFeeds = response.data.item;

      // console.log(myFeeds.content[0].feedFileDtoList[0]); 게시물 첫번 째 사진 찍기

      setMyFeed(myFeeds);
    } catch (e) {
      alert("에러가 발생했습니다.");
    }
  }, [id]);

  useEffect(() => {
    findById();
    findFeedById();
    console.log(myPage);
  }, []);

  return (
    <section className="whole-section">
      <main className="content">
        <div className="mypage-frame">
          <header className="mypage-header">
            <section className="user-image-section">
              <div className="user-image">
                {baseURL}{profileImage}
              </div>
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
                <TfiLayoutGrid3 />
              </a>
              <a aria-selected="false" className="b-tag" href="" role="tab">
                <FaRegBookmark />
              </a>
            </div>
          </section>
          {/* 스타일을 위해 여러 div로 감싸둔 것 같음. 
                        게시글 추가는 아래 content-frame이 더 생성 됌 */}
          <section className="bar-content-section">
            <div className="bar-content-frame">
              {/* 아래 div가 실제 표출되는 사진 */}
              {/* 아래 feed 생성은 feed 컴포넌트로. */}
              <div className="feed1"></div>
              <div className="feed2"></div>
              <div className="feed3"></div>
            </div>
          </section>
        </div>
      </main>
      <Footer profileImage={profileImage} />
    </section>
  );
};

export default MyPage;
