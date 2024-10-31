import React from 'react'
import axios from 'axios';
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import '../scss/FindTelInput.scss';

function FindTelInput() {

    const navigate = useNavigate();

    // location.state로 전달된 값을 useState로 초기화
    const [userForm, setUserForm] = useState({
        email: '',
        password: '',
        nickname: '',
        tel: '',
        generatedCode: ''
    });


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

		if (e.target.name === 'tel'){
			updateTelState('error', false);
			updateTelState('chk', false);
			updateTelState('validated', false);
		}
    
	}, [userForm, updateTelState]);


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
                tel: userForm.tel,
            });

            // setUserForm({
            //     ...userForm,
            //     email: response.data.item.email,
            //     nickname: response.data.item.nickname,
            //     tel: userForm.tel
            // })

            if (response.data.item.telCheckMsg === 'not exist tel') {
                updateTelState('error', true);
                updateTelState('placeHolder', '존재하지 않는 회원입니다.');
                setUserForm({
					...userForm,
					tel: ''
				});
            } else {
				updateTelState('chk', true);
				updateTelState('validated', true);
				setUserForm({
					email: response.data.item.email,
					nickname: response.data.item.nickname,
					tel: userForm.tel
				})
				console.log('입력한 전화번호:', userForm.tel);
			}
		} catch(error){
			alert('에러 발생: ', error);
		}
	}, [userForm, validateTelFormat, updateTelState])


    // 입력란에서 포커스가 벗어날 때 유효성 검사 수행
    const handleBlur = useCallback((e) => {

		const fieldName = e.target.name;

		if(fieldName === 'tel'){
			telCheck();
		}
    }, [telCheck]);


    // 회원가입 제출
    const handeTelVer = useCallback(async (e) => {
        e.preventDefault();

		// 각 상태의 chk 값을 확인해서 유효성 검사
		if (!telState.chk) {
			alert('입력된 값이 유효하지 않습니다. 다시 입력해주세요.');
			return;
		}

		try {
			// SMS 전송
			const response = await axios.post('/users/send', { tel: userForm.tel });
	
			if (response.status === 200) {
				// 인증 번호 전송 후, 인증 페이지로 이동하면서 가입 정보를 넘김
				navigate('/findcodever', { 
					state: { 
						...userForm, 
                        generatedCode: response.data.item // 서버에서 생성한 인증 코드
					}
				});
			}

            console.log(userForm.email);
            console.log(userForm.nickname);
            console.log(userForm.tel);
		} catch (error) {
			alert('회원가입 실패, 정보를 다시 입력하세요.');
			console.log('회원가입 오류: ', error);
		}
	}, [userForm, telState.chk, navigate]);


    const handleLogin = () => {
		navigate('/');
	};

  return (
	<div id='fti_body'>
		<form className="fti_container" onSubmit={handeTelVer}>
			<div className="fti_logo">
				<p>Hi-we</p>
			</div>
			<div className="fti_text">가입시 등록한 번호를 입력하세요 </div>
			<div className="fti_chkNumBox">
			<input 
				type="text" 
				name="tel"
				placeholder={telState.placeHolder}
				value={userForm.tel}
				onChange={changeTextField}
				onBlur={handleBlur}
				className={telState.error ? 'fti_tel_error' : 'fti_tel'}
			/>
			</div>
			<button type="submit" className="fti_next">다음</button>
			<div class="divider">
				<hr class="left" />
					<span>또는</span>
				<hr class="right" />
			</div>
			<button type="button" className="fti_back_login" onClick={handleLogin}>로그인 페이지로 이동</button>
		</form> 
	  </div>
  )
}

export default FindTelInput