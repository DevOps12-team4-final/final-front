import Footer from "./frame/Footer";
import "../scss/MyPage.scss";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const MyPage = () => {
  const { profileImage } = useSelector((state) => state.userSlice || {});
  

  const [myPage, setMyPage] = useState(null);

  const { id } = useParams();

  const loginUserId = useSelector((state) => state.userSlice|| {});

  const findById = useCallback(async () => {
    try{
      const response = await axios.get(
        `http://223.130.150.189:9090/users/profilePage/${loginUserId.UaerId}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`,
          },
        }
      );

      console.log(response.data.item);
      setMyPage(() => response.data.item);
    } catch (e) {
      alert("에러가 발생했습니다.");
    }
  }, [id]);

  useEffect(() => {
    findById();
  }, []);


  return (
    <section class="whole-section">
      <main class="content">
        <div class="frame">
          <header class="mypage-header">
            <section class="user-image-section">
              <div class="user-image"></div>
            </section>
            <section class="user-information-frame">
              <section class="user-information">
                <div class="user-nickname">NICKNAME</div>
                <div class="profile-edit">PROFILE_EDIT_BUTTON</div>
                {/* 클래스명 system/general-setting 중 고민 됌
                            이 부분에 로그아웃, 계정 다른 앱으로 공유하기 등 있으면 좋을듯 함 */}
                <div class="system-setting">SETTING_IMG</div>
              </section>
              <section class="user-follower-cnt">
                <div class="feed-cnt">게시글 수</div>
                <div class="follower-cnt">팔로우 수</div>
                <div class="following-cnt">팔로잉 수</div>
              </section>
              <section class="user-comment">자기소개</section>
            </section>
          </header>
          <section class="mypage-bar-frame">
            <div class="mypage-bar">
              <a aria-selected="true" class="feed-tag" href="" role="tab">
                게시물
              </a>
              <a aria-selected="false" class="b-tag" href="" role="tab">
                기능
              </a>
              <a aria-selected="false" class="c-tag" href="" role="tab">
                기능
              </a>
            </div>
          </section>
          {/* 스타일을 위해 여러 div로 감싸둔 것 같음. 
                        게시글 추가는 아래 content-frame이 더 생성 됌 */}
          <section class="bar-content-section">
            <div class="bar-content-frame">
              {/* 아래 div가 실제 표출되는 사진 */}
              {/* 아래 feed 생성은 feed 컴포넌트로. */}
              <div class="feed1"></div>
              <div class="feed2"></div>
              <div class="feed3"></div>
            </div>
          </section>
        </div>
      </main>
      <Footer profileImage={profileImage} />
      </section>
  );
};

export default MyPage;
