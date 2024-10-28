import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../scss/FindCodeVer.scss';



function FindCodeVer() {

    const navigate = useNavigate();
	const location = useLocation();

    // location.state로 전달된 값을 useState로 초기화
    const [userForm, setUserForm] = useState({
        email: location.state?.email || '',
        nickname: location.state?.nickname || '',
        tel: location.state?.tel || '',
        generatedCode: location.state?.generatedCode || ''
    });
    const [inputCode, setInputCode] = useState('');

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
    } catch (error) {
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
            navigate('/resetpw', { 
                state: { 
                    ...userForm, 
                }
            });
        } catch (error) {
            alert('오류가 발생했습니다.');
        }
    } else {
        alert('인증 코드가 일치하지 않습니다.');
    }
};

const handleLogin = () => {
    navigate('/');
};


  return (
    <div id='fu_auth_body'>
        <form className="fu_auth_container" onSubmit={handleVerification}>
            <div className="fu_auth_logo">
                <p>Logo</p>
            </div>
            <div className="fu_auth_text">{`${userForm.tel}로 전송된 6자리 코드를 입력하세요`}</div>
            <div className="fu_auth_chkNumBox">
            <input 
                type="text" 
                name="chkNum"
                placeholder='인증번호'
                value={inputCode}
                onChange={handleChange}
                className="fu_auth_chkNum"
            />
            </div>
            <button type="submit" className="fu_auth_next">다음</button>
            <button type='button' className="fu_auth_newCode" onClick={handleResendCode}>새 코드 요청하기</button>
            <div class="divider">
                <hr class="left" />
                    <span>또는</span>
                <hr class="right" />
            </div>
            <button type="button" className="fu_auth_back" onClick={handleLogin}>로그인 페이지로 이동</button>
        </form> 
      </div>
  )
}

export default FindCodeVer