import React  from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';
import { addMessage } from '../slices/alarmSlice'; // 메시지를 관리할 slice
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { useEffect } from 'react'
import { get } from '../apis/alarmApi';
const Layout = () => {
  //Alamrsocket 넣기 소켓에서 데이터 받고 처리하기
  const url ='http://localhost:9090/ws/api'
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const LoginUserId = useSelector(state => state.userSlice.userId);
  useEffect(() => {
        if(LoginUserId == 0){
         navigate(`/`, { replace: true });
        }
        const socket = new SockJS('http://localhost:9090/ws');
        const stompClient = Stomp.over(socket);
        stompClient.connect({}, async function(frame) {
            console.log('Connected: ' + frame);
            // Subscribe to audio messages from the server
            stompClient.subscribe(`/topic/alarm/${LoginUserId}`, (message) => {
              if (message.body) {
                const parsedMessage = JSON.parse(message.body);
                console.log(message)
                dispatch(addMessage(parsedMessage));  // 메시지를 Redux slice로 디스패치
              }
            });
        }, function(error) {
            console.error('Connection error: ' + error); // Handle connection errors
        });
        // Handle disconnection on window unload
        window.onbeforeunload = function() {
            console.log("DISCONNECT")
            stompClient.disconnect();
        };
        //getAlars
        dispatch(get(LoginUserId ));
  }, []);

  

  return (
    <>
     <main>
            <Outlet/>
     </main>
    </>
  )
}

export default Layout
