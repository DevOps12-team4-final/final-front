import React ,{useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { addMessage } from '../../slices/alarmSlice'; // 메시지를 관리할 slice
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';


const useAlarmWebSocket = () => {
  const url ='http://localhost:9090/ws/api'

  const dispatch = useDispatch();
  const LoginUserId =1 //useSelector(state => state.memberSlice.id);
  useEffect(() => {
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
  }, []);

};

export default useAlarmWebSocket