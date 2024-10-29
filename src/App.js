// import { useSelector } from 'react-redux';
import { Routes, Route} from 'react-router-dom'; 
import { store } from './store/store';
// import { PersistGate } from 'redux-persist/integration/react';
// import { persistStore } from 'redux-persist';
import Chat from './pages/chat/Chat';
import ChatBoard from './pages/chat/ChatBoard ';
import ChatRoomSetting from './pages/chat/ChatRoomSetting';
import Login from './pages/sign/Login';
import Join from './pages/sign/Join';
import JoinTelVer from './pages/sign/JoinTelVer';
import Logout from './pages/sign/Logout';
// import useAlarmWebSocket from './components/frame/useAlarmWebSocket';
import AlarmList from './pages/alarm/AlarmList'
import React, { useEffect, useState } from 'react';


import { BrowserRouter as Router} from 'react-router-dom';
import { Provider } from 'react-redux';
// import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css";
import Post from './pages/Post';
import FindCodeVer from './pages/FindCodeVer';
import FindTelInput from './pages/FindTelInput';
import ResetPw from './pages/ResetPw';
import MyPage from './pages/MyPage';
import Feed from './pages/followingfeed/Feed';
import FeedGrid from './pages/latesetfeed/FeedGrid';
import Footer from "./pages/frame/Footer"

function App() {
  
  
  return (
    <Provider store={store}> {/* Redux Provider로 감싸기 */}
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/posts" element={<Post />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/jointelver" element={<JoinTelVer />} />
          <Route path="/findtelinput" element={<FindTelInput />}/>
          <Route path="/findcodever" element={<FindCodeVer />} />
          <Route path="/resetpw" element={<ResetPw />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/MyPage" element={<MyPage />} />
          <Route path="/feedgrid" element={<FeedGrid />} />
          <Route path="/AlarmList" element={<AlarmList />} />
          <Route path="/Chat" element={<Chat />} />
          <Route path="/ChatBoard" element={<ChatBoard />} />
          <Route path="/ChatRoomSetting" element={<ChatRoomSetting />} />
          <Route path="/Footer" element={<Footer />} />
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}


export default App;

