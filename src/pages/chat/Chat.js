// ChatRoom.js
import React, { useEffect, useState ,useRef } from 'react';
import { useSelector } from 'react-redux';
import ChatBox from '../../components/chat/ChatBox';
import ChatInput from '../../components/chat/ChatInput';
import { enterRoom } from '../../apis/chatApi';
import { useParams } from 'react-router-dom';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import '../../scss/chat/chatRoom.scss';
import Header from '../../components/frame/Header';
import {sendFileToRoom} from '../../apis/chatApi'
import useAlarmWebSocket from '../../components/frame/useAlarmWebSocket';


//test
const test_messages = [
    { id: 1, message: '비트캠프유안인', Type:"" ,  createdAt: '2024.09.23', userId: false },
    { id: 2, message: '운동 해요지',  Type:"" ,createdAt: '2024.09.23', userId: true },
    { id: 3, message: '비트캠프유안인',  Type:"" ,createdAt: '2024.09.24', userId: false },
    { id: 4, message: '운동 해요지', Type:"" ,createdAt: '2024.09.24', userId: true },
];

const Chat = () => {
    const stompClientRef = useRef(null);
    const chatListRef = useRef(null)
    const {roomId} = useParams();
    const loginUserId =  1// useSelector(state => state.memberSlice.id);
    const [messages,setMessage] = useState([]);
    const[isSideOpen,setIsSideOpen] = useState([]);
    //useAlarmWebSocket()

    useEffect(()=>{
        //방 입장
        getChats()
        const socket = new SockJS('http://localhost:9090/ws');
        const stompClient = Stomp.over(socket);
        stompClient.connect({}, async function(frame) {
            console.log('Connected: ' + frame);
            // Subscribe to audio messages from the server
            stompClient.subscribe(`/topic/chat/${roomId}`, (messageData) => {
                console.log(JSON.parse(messageData.body))
                const message=JSON.parse(messageData.body)
                setMessage(prevMessages => ([
                    ...prevMessages,
                    message
                ]));
            });
        }, function(error) {
            console.error('Connection error: ' + error); // Handle connection errors
        });
        stompClientRef.current = stompClient;

        // Handle disconnection on window unload
        window.onbeforeunload = function() {
            stompClient.disconnect();
        };

        return () => {
            stompClientRef.current.disconnect()
        }
    },[])

    useEffect(()=>{
        console.log(messages)
        scrollToBottom()
    },[messages])

   
    
    const getChats= async ()=>{
        const res =  await enterRoom(roomId,loginUserId);
        console.log(res.data.items)
        setMessage(res.data.items)
    }

    const scrollToBottom = () => {
        if (chatListRef.current) {
            console.log("i tryed")
            chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
        }
    };
    const send_message = async (test_chat) =>{
        stompClientRef.current.send("/app/send", {}, JSON.stringify(test_chat));    
    }
    const send_file = async(formData) =>{
        sendFileToRoom(roomId,formData)

    }



    return (
        <>
            <Header />
            <main className="chat-area">
                <div className="chat-list" ref={chatListRef}>
                    {messages.map((chat, index) => {
                        const currentMessageDate = new Date(chat.createdAt).toLocaleDateString();
                        const previousMessageDate = index > 0 ? new Date(messages[index - 1].createdAt).toLocaleDateString() : null;
                        const currentUserId = chat.userId
                        const prevUserId = index > 0 ?  messages[index - 1].userId : null
                        return (
                            <React.Fragment key={index}>
                                {currentMessageDate !== previousMessageDate && (
                                    <div className="date-separator">
                                        <span>{currentMessageDate}</span>
                                    </div>
                                )}
                                <ChatBox chat={chat} flag={currentUserId === prevUserId} />
                            </React.Fragment>
                        );
                    })}
                </div>
            </main>
            
            <ChatInput className="chat-input" send_message={send_message} send_file={send_file} roomId={roomId} userId={loginUserId}/>
        </>
    );
};

export default Chat ;
