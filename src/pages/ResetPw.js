import React, { useCallback, useState } from 'react'
import { useNavigate, useLocation  } from 'react-router-dom';
import axios from 'axios';
import '../scss/ResetPw.scss';

function ResetPw() {

    const navigate = useNavigate();
	const location = useLocation();

    const [userForm, setUserForm] = useState({
        email: location.state?.email || '',
        nickname: location.state?.nickname || '',
        password: location.state?.password || '',
        passwordCheck: '',
        tel: location.state?.tel || '',
        generatedCode: location.state?.generatedCode || ''
    });

    const [passwordState, setPasswordState] = useState({
		placeHolder: '변경할 비밀번호',
		error: false,
		chk: false,
		validated: false
	});

	const updatePasswordState = useCallback((field, value) => {
		setPasswordState((prevState) => ({
			...prevState,
			[field]: value
		}));
	}, []);

	const [passwordChkState, setPasswordChkState] = useState({
		placeHolder: '비밀번호 확인',
		error: false,
		chk: false,
		validated: false
	});

	const updatePasswordChkState = useCallback((field, value) => {
		setPasswordChkState((prevState) => ({
			...prevState,
			[field]: value
		}));
	}, []);

    	// 입력 값에 따른 유효성 초기화
        const changeTextField = useCallback((e) => {
            setUserForm({
              ...userForm,
              [e.target.name]: e.target.value
            });
    
            if (e.target.name === 'password'){
                updatePasswordState('error', false);
                updatePasswordState('chk', false);
                updatePasswordState('validated', false);
            }
    
            if (e.target.name === 'passwordCheck'){
                updatePasswordChkState('error', false);
                updatePasswordChkState('chk', false);
                updatePasswordChkState('validated', false);
            }
        
        }, [userForm, updatePasswordState, updatePasswordChkState]);

        // 비밀번호 유효성 양식
    const validatePasswordFormat = useCallback(() => {
        return /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*+=-]).{9,}$/.test(userForm.password);
    }, [userForm.password]);


	// 비밀번호 유효성 검사
	const passwordCheck = useCallback(() => {

		if (updatePasswordState('validated', true)) return;

		try{

			if(userForm.password === ''){
				updatePasswordState('error', true);
				updatePasswordState('placeHolder', '비밀번호를 입력하세요.');
				setUserForm({
					...userForm,
					password: ''
				});
				return;
			} else if(!validatePasswordFormat(userForm.password)){
				updatePasswordState('error', true);
				updatePasswordState('placeHolder', '영문자, 숫자, 특수문자 포함 9자 이상 입력하세요.');
				setUserForm({
					...userForm,
					password: ''
				});
				return;
			} else {
				updatePasswordState('chk', true);
				updatePasswordState('validated', true);
			}
		} catch(error) {
			alert('에러 발생: ', error);
		}
	}, [userForm, validatePasswordFormat, updatePasswordState]);


	// 비밀번호 확인 유효성 검사
	const passwordDoubleCheck = useCallback(() => {

		if(updatePasswordChkState('validated', true)) return;

		try{
			if (userForm.passwordCheck === '') {
				updatePasswordChkState('error', true);
				updatePasswordChkState('placeHolder', '비밀번호가 일치하지 않습니다.');
				setUserForm({
					...userForm,
					passwordCheck: ''
				});
				return;
			} else if (userForm.password !== userForm.passwordCheck) {
				updatePasswordChkState('error', true);
				updatePasswordChkState('placeHolder', '비밀번호가 일치하지 않습니다.');
				setUserForm({
					...userForm,
					passwordCheck: ''
				});
				return;
			} else {
				updatePasswordChkState('chk', true);
				updatePasswordChkState('validated', true);
			}	
		} catch(error){
			alert('에러 발생: ', error);
		}
	}, [userForm, updatePasswordChkState]);

    // 입력란에서 포커스가 벗어날 때 유효성 검사 수행
    const handleBlur = useCallback((e) => {

		const fieldName = e.target.name;

		if(fieldName === 'password'){
			passwordCheck();
		} else if(fieldName === 'passwordCheck'){
			passwordDoubleCheck();
		}
    }, [passwordCheck, passwordDoubleCheck]);

    // 회원가입 제출
    const handleResetPw = useCallback(async (e) => {
        e.preventDefault();

		// 각 상태의 chk 값을 확인해서 유효성 검사
		if (!passwordState.chk || !passwordChkState.chk) {
			alert('입력된 값이 유효하지 않습니다. 모든 필드를 확인해주세요.');
			return;
		}

		try {
			// SMS 전송
			const response = await axios.post('/users/modify-password', {
                    email: userForm.email,
                    password: userForm.password,
                });


            // if(joinForm.password === response.data.item.password){
            //     alert('이전 비밀번호와 일치합니다. 다시입력하세요.');
            //     return;
            // }
	
			if (response.status === 200) {
                alert('비밀번호를 변경했습니다. 다시 로그인 해주세요.')
				navigate('/');
			}

		} catch (error) {
			alert('비밀번호 변경 실패, 정보를 다시 입력하세요.');
		}
	}, [userForm, passwordState.chk, passwordChkState.chk, navigate]);


	const handleLogin = () => {
		navigate('/');
	};

  return (
    <form className="rp_container" onSubmit={handleResetPw}>
        <div className="rp_logo">
            <p>Logo</p>
        </div>
        <div className="rp_text1">
            이메일 주소 확인
        </div>
        <div className="rp_text2">
            {userForm.email}
        </div>
        <div className="rp_pwBox">
				<input 
					type="password" 
					name="password"
					placeholder={passwordState.placeHolder}
					value={userForm.password}
					onChange={changeTextField}
					onBlur={handleBlur}
					className={passwordState.error ? 'rp_pw_error' : 'rp_pw'}
				/>
			</div>
			<div className="rp_pwChkBox">
				<input 
					type="password" 
					name="passwordCheck"
					placeholder={passwordChkState.placeHolder}
					value={userForm.passwordCheck}
					onChange={changeTextField}
					onBlur={handleBlur}
					className={passwordChkState.error ? 'rp_pwChk_error' : 'rp_pwChk'}
				/>
			</div>
        <button type="submit" className="rp_next">변경</button>
        <div class="divider">
            <hr class="left" />
                <span>또는</span>
            <hr class="right" />
        </div>
        <button type="button" className="rp_back_login" onClick={handleLogin}>로그인 페이지로 이동</button>
      </form> 
  )
}

export default ResetPw