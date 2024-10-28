import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom'; 
import { Provider } from 'react-redux';
import { store } from './store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import Layout from './pages/layout';
import Chat from './pages/chat/Chat';
import ChatBoard from './pages/chat/ChatBoard ';
import ChatRoomSetting from './pages/chat/ChatRoomSetting';
import Login from './pages/sign/Login';
import Join from './pages/sign/Join';
import useAlarmWebSocket from './components/frame/useAlarmWebSocket';
import AlarmList from './pages/alarm/AlarmList'

function App() {
  const persiststore = persistStore(store);
  // WebSocket을 연결하기 위한 URL을 설정합니다.
  return (
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persiststore}>
        <Routes>
          <Route path="/" element={<Login />} />
            <Route path="/join" element={<Join />} />
            <Route path="/chatBoard" element={<ChatBoard />} />  
            <Route path="/chatRoomSetting" element={<ChatRoomSetting />} />
            <Route path="/chatRoom/:roomId" element={<Chat />} />
            <Route path="/alarm" element={<AlarmList />} />
        </Routes>
      </PersistGate>
    </Provider>
  );
}

export default App;
