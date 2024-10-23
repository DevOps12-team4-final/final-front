import Footer from "./frame/Footer";
import '../scss/MyPage.scss';


const MyPage = () => {
    
    return (
        <section class="whole-section">
            <main class="content">
                <div class="frame">
                    <header class="mypage-header">
                        <section class="user-image"></section>
                         <section clss="user-information-frame">
                         <section class="user-information">
                            <div class="user-nickname"></div>
                            <div class="profile-edit"></div>
                            {/* 클래스명 system/general-setting 중 고민 됌
                            이 부분에 로그아웃, 계정 다른 앱으로 공유하기 등 있으면 좋을듯 함 */}
                            <div class="system-setting"></div>
                         </section>
                         <section class="user-follower-cnt">
                            <div class="feed-cnt"></div>
                            <div class="follower-cnt"></div>
                            <div class="following-cnt"></div>
                          </section>
                            <section class="user-comment"></section>
                        </section>
                    </header>
                    <section class="mypage-bar-frame">
                    <div class="mypage-bar">
                        <a aria-selected="true" class="feed-tag" href="" role="tab"></a>
                        <a aria-selected="true" class="b-tag" href="" role="tab"></a>
                        <a aria-selected="true" class="c-tag" href="" role="tab"></a>
                    </div>
                    </section>
                    {/* 스타일을 위해 여러 div로 감싸둔 것 같음. 
                        게시글 추가는 아래 content-frame이 더 생성 됌 */}
                    <div class="bar-content-frame">
                            <div class="bar-content-sectionframe">
                                {/* 아래 div가 실제 표출되는 사진 */}
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                        </div>
                </div>
            </main>
            <Footer profileImage={null}/>
        </section>
    );
};

export default MyPage;