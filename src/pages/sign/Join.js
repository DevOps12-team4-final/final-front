import React, { useCallback, useState } from 'react'
import { useNavigate, useLocation  } from 'react-router-dom';
import axios from 'axios';
import '../../scss/Join.scss';

function Join() {

    const navigate = useNavigate();
	const location = useLocation();


	const [userForm, setUserForm] = useState({
        email: location.state?.email || '',
        password: location.state?.password || '',
        passwordCheck: '',
        nickname: location.state?.nickname || '',
        tel: location.state?.tel || '',
        generatedCode: location.state?.generatedCode || ''
    });

	const [emailState, setEmailState] = useState({
		placeHolder: '이메일',
		error: false,
		chk: false,
		validated: false
	});

	const updateEmailState = useCallback((field, value) => {
		setEmailState((prevState) => ({
			...prevState,
			[field]: value
		}));
	},[]);

	const [nicknameState, setNicknameState] = useState({
		placeHolder: '닉네임',
		error: false,
		chk: false,
		validated: false
	});

	const updateNicknameState = useCallback((field, value) => {
		setNicknameState((prevState) => ({
			...prevState,
			[field]: value
		}));
	}, []);

	const [passwordState, setPasswordState] = useState({
		placeHolder: '비밀번호',
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

	const [telState, setTelState] = useState({
		placeHolder: '전화번호',
		error: false,
		chk: false,
		validated: false
	});

	const updateTelState = useCallback((field, value) => {
		setTelState((prevState) => ({
			...prevState,
			[field]: value
		}));
	},[]);



	// 입력 값에 따른 유효성 초기화
    const changeTextField = useCallback((e) => {
        setUserForm({
          ...userForm,
          [e.target.name]: e.target.value
        });

    
        if (e.target.name === 'email') {
			updateEmailState('error', false);
			updateEmailState('chk', false);
			updateEmailState('validated', false);
        }

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

		if (e.target.name === 'nickname'){
			updateNicknameState('error', false);
			updateNicknameState('chk', false);
			updateNicknameState('validated', false);
		}

		if (e.target.name === 'tel'){
			updateTelState('error', false);
			updateTelState('chk', false);
			updateTelState('validated', false);
		}
    
	}, [userForm, updateEmailState, updatePasswordState, updatePasswordChkState, updateNicknameState, updateTelState]);


	// 이메일 유효성 양식
	const validateEmailFormat = useCallback(() => {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userForm.email);
	}, [userForm.email]);


	// 이메일 유효성 검사
    const emailCheck = useCallback(async () => {

		if(updateEmailState('validated', true)) return;

        try {

            if (userForm.email === '') {
                updateEmailState('error', true);
                updateEmailState('placeHolder', '이메일을 입력하세요.');
                setUserForm({
					...userForm,
					email: ''
				});
                return;
            }
            
            if(!validateEmailFormat(userForm.email)){
				updateEmailState('error', true);
				updateEmailState('placeHolder', '이메일형식으로 입력하세요.');
                setUserForm({
					...userForm,
					email: ''
				});
                return;
            }

            const response = await axios.post('/users/email-check', {
                email: userForm.email
            });

            if (response.data.item.emailCheckMsg === 'invalid email') {
                updateEmailState('error', true);
                updateEmailState('placeHolder', '이미 존재하는 이메일 입니다.');
                setUserForm({
					...userForm,
					email: ''
				});
            } else {
				updateEmailState('chk', true);
				updateEmailState('validated', true);
            }
        } catch (error) {
            alert('error 발생: ', error);
        }
    }, [userForm, validateEmailFormat, updateEmailState]);


	// 닉네임 유효성 검사
	const nicknameCheck = useCallback(async () => {

		if(updateNicknameState('validated', true)) return;

        try {

            if (userForm.nickname === '') {
                updateNicknameState('error', true);
                updateNicknameState('placeHolder', '닉네임을 입력하세요.');
                setUserForm({
					...userForm,
					nickname: ''
				});
                return;
            }

            const response = await axios.post('/users/nickname-check', {
                nickname: userForm.nickname
            });

            if (response.data.item.nicknameCheckMsg === 'invalid nickname') {
                updateNicknameState('error', true);
                updateNicknameState('placeHolder', '이미 존재하는 닉네임 입니다.');
                setUserForm({
					...userForm,
					nickname: ''
				});
            } else {
				updateNicknameState('chk', true);
				updateNicknameState('validated', true);
            }
        } catch (error) {
            alert('error 발생: ', error);
        }
    }, [userForm, updateNicknameState]);


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


	// 전화번호 유효성 양식
	const validateTelFormat = useCallback(() => {
        return /^010\d{8}$/.test(userForm.tel);
    }, [userForm.tel]);


	// 전화번호 유효성 검사
	const telCheck = useCallback(async () => {

		if(updateTelState('validated', true)) return;

		try{
			if(userForm.tel === ''){
				updateTelState('error', true);
				updateTelState('placeHolder', '전화번호를 입력하세요.');
				setUserForm({
					...userForm,
					tel: ''
				});
				return;
			}
			
			if(!validateTelFormat(userForm.tel)){
				updateTelState('error', true);
				updateTelState('placeHolder', '010으로 시작하는 "-" 없이 11자리 숫자여야 합니다.');
				setUserForm({
					...userForm,
					tel: ''
				});
				return;
			}
			
			const response = await axios.post('/users/tel-check', {
                tel: userForm.tel
            });

            if (response.data.item.telCheckMsg === 'invalid tel') {
                updateTelState('error', true);
                updateTelState('placeHolder', '이미 존재하는 번호 입니다.');
                setUserForm({
					...userForm,
					tel: ''
				});
            } else {
				updateTelState('chk', true);
				updateTelState('validated', true);
			}
		} catch(error){
			alert('에러 발생: ', error);
		}
	}, [userForm, validateTelFormat, updateTelState])


	// 입력란에서 포커스가 벗어날 때 유효성 검사 수행
    const handleBlur = useCallback((e) => {

		const fieldName = e.target.name;

		if(fieldName === 'email'){
			emailCheck();
		} else if(fieldName === 'password'){
			passwordCheck();
		} else if(fieldName === 'passwordCheck'){
			passwordDoubleCheck();
		} else if(fieldName === 'nickname'){
			nicknameCheck();
		} else if(fieldName === 'tel'){
			telCheck();
		}
    }, [emailCheck, passwordCheck, passwordDoubleCheck, nicknameCheck, telCheck]);


    // 회원가입 제출
    const handleJoin = useCallback(async (e) => {
        e.preventDefault();

		// 각 상태의 chk 값을 확인해서 유효성 검사
		if (!emailState.chk || !passwordState.chk || !passwordChkState.chk || !nicknameState.chk || !telState.chk) {
			alert('입력된 값이 유효하지 않습니다. 모든 필드를 확인해주세요.');
			return;
		}

		try {
			const response = await axios.post('/users/send', {
				tel: userForm.tel 
			});
	
			if (response.status === 200) {
				navigate('/jointelver', { 
					state: { 
						...userForm, 
						generatedCode: response.data.item
					}
				});
			}
			console.log('폼에 담긴 정보: ', userForm);
		} catch (error) {
			alert('회원가입 실패, 정보를 다시 입력하세요.');
			console.log('회원가입 오류: ', error);
		}
	}, [userForm, emailState.chk, passwordState.chk, passwordChkState.chk, nicknameState.chk, telState.chk, navigate]);


	const handleLogin = () => {
		navigate('/');
	};

  	return (
		<form onSubmit={handleJoin} className="join_container">
			<div className="join_logo">
				Logo
			</div>
			<div className="join_text">빠르고 쉽게 가입할 수 있습니다.</div>
			<div className="join_emailBox">
				<input 
					type="text" 
					name="email"
					placeholder={emailState.placeHolder}
					value={userForm.email}
					onChange={changeTextField}
					onBlur={handleBlur}
					className={emailState.error ? 'join_email_error' : 'join_email'}
				/>
			</div>
			<div className="join_pwBox">
				<input 
					type="password" 
					name="password"
					placeholder={passwordState.placeHolder}
					value={userForm.password}
					onChange={changeTextField}
					onBlur={handleBlur}
					className={passwordState.error ? 'join_pw_error' : 'join_pw'}
				/>
			</div>
			<div className="join_pwChkBox">
				<input 
					type="password" 
					name="passwordCheck"
					placeholder={passwordChkState.placeHolder}
					value={userForm.passwordCheck}
					onChange={changeTextField}
					onBlur={handleBlur}
					className={passwordChkState.error ? 'join_pwChk_error' : 'join_pwChk'}
				/>
			</div>
			<div className="join_nicknameBox">
				<input 
					type="text" 
					name="nickname"
					placeholder={nicknameState.placeHolder}
					value={userForm.nickname}
					onChange={changeTextField}
					onBlur={handleBlur}
					className={nicknameState.error ? 'join_nickname_error' : 'join_nickname'}
				/>
			</div>
			<div className="join_telBox">
				<input 
					type="text" 
					name="tel"
					placeholder={telState.placeHolder}
					value={userForm.tel}
					onChange={changeTextField}
					onBlur={handleBlur}
					className={telState.error ? 'join_tel_error' : 'join_tel'}
				/>
			</div>
			<button type="submit" className="join_nextBtn">다음</button>
	
			{/* <div className="divider">
				<hr className="left" />
					<span>또는</span>
				<hr className="right" />
			</div> */}
			<button type="button" onClick={handleLogin} className="join_loginBtn">로그인 페이지로 이동</button>
		</form>
  	)
}

export default Join