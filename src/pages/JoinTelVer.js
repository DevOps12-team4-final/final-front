import React from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { join } from '../apis/userApis';
import '../scss/JoinTelVer.scss';

function JoinTelVer() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    // location.state로 전달된 값을 useState로 초기화
    const [userForm, setUserForm] = useState({
        email: location.state?.email || '',
        password: location.state?.password || '',
        nickname: location.state?.nickname || '',
        tel: location.state?.tel || '',
        generatedCode: location.state?.generatedCode || ''
    });
    const [inputCode, setInputCode] = useState('');

    // 돌아가기 버튼을 눌렀을 때 상태와 함께 이전 페이지로 이동
    const handleBack = () => {
        // joinForm 데이터를 유지한 채로 Join 페이지로 돌아가기
        navigate('/join', { 
            state: {
                ...userForm
            }
        });
    };

    // 인증 코드 입력 처리
    const handleChange = (e) => {
        setInputCode(e.target.value);
    };

    // 인증번호 재전송 요청
    const handleResendCode = async () => {

        try {

            const response = await axios.post('/users/send', { 
                tel: userForm.tel 
            });

            if (response.status === 200) {
                alert('새로운 인증 코드가 전송되었습니다.');

                // 새로운 인증 코드를 상태에 저장
                setUserForm(prevForm => ({
                    ...prevForm,
                    generatedCode: response.data.item // 서버에서 받은 새 인증 코드 저장
                }));
                
                console.log('새로 받은 코드:', response.data.item);
            }
        }catch (error) {
                alert('코드 전송에 실패했습니다. 다시 시도해주세요.');
                console.log(error);
        }
    };
  
    const handleVerification = async (e) => {
        e.preventDefault();

        // 새로운 코드와 입력한 코드 비교 (콘솔 로그로 상태 확인)
        console.log('사용자 입력 코드:', inputCode);
        console.log('현재 상태의 인증 코드:', userForm.generatedCode);
  
        if (inputCode === userForm.generatedCode) {
        
            try {

            // 인증 성공 후 회원가입 완료 API 호출
            const result = await dispatch(join(userForm));
            console.log('회원가입 응답 데이터:', result);

            if(result){
                navigate('/', {state: result});
                console.log('회원가입 성공');
            }
            } catch (error) {
                alert('회원가입 중 오류가 발생했습니다.');
            }
        } else {
            alert('인증 코드가 일치하지 않습니다.');
        }
    };

    
  return (
    <div id='jtv_body'>
        <form className="jtv_container" onSubmit={handleVerification}>
            <div className="jtv_logo">
                <p>Logo</p>
            </div>
            <div className="jtv_text">{`${userForm.tel}로 전송된 6자리 코드를 입력하세요`}</div>
            <div className="jtv_chkNumBox">
            <input 
                type="text" 
                name="chkNum"
                placeholder='인증번호'
                value={inputCode}
                onChange={handleChange}
                className="jtv_chkNum"
            />
            </div>
            <button type="submit" className="jtv_join">가입하기</button>
            <button type='button' className="jtv_newCode" onClick={handleResendCode}>새 코드 요청하기</button>
            <div class="divider">
                <hr class="left" />
                    <span>또는</span>
                <hr class="right" />
            </div>
            <button type="button" className="jtv_back" onClick={handleBack}>돌아가기</button>
        </form> 
      </div>
  )
}

export default JoinTelVer