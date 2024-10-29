import React, { useCallback,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../apis/userApis';
import '../scss/Login.scss';

function Login() {

  const [userForm, setUserForm] = useState({
    userId: '',
    email: '',
    password: '',
    profileImage: '',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();


  const changeTextField = useCallback((e) => {
    setUserForm({
        ...userForm,
        [e.target.name]: e.target.value,
    });
  }, [userForm]);


  const handleLogin = async (e) => {
    e.preventDefault();

    if (userForm.email === '' || userForm.password === '') {
        alert('입력된 값이 유효하지 않습니다. 모든 필드를 확인해주세요.');
        return;
    }
    
    try{
      const result = await dispatch(login(userForm)).unwrap();
      console.log('로그인 응답 데이터: ', result);

      if(result){
        navigate('/feed', {state: result.item});
        console.log('로그인 성공');
      }
    } catch(error){
      alert('로그인 중 오류가 발생했습니다. 다시입력하세요.');
      console.error('로그인 오류: ', error);
    }
  }


  const handleJoin = () => {
    navigate('/join');
  };

  const handleFindUser = () => {
    navigate('/findtelinput');
  };


  return (
    <div id='login_body'>
    <form onSubmit={handleLogin} className='login_container'>
        <div className="login_logo">
            <p>Logo</p>
        </div>
        <div className='login_emailBox'>
            <input 
                className='login_email'
                type="text" 
                name="email"
                value={userForm.email} 
                onChange={changeTextField}
                placeholder='이메일'
            />
        </div>
        <div className='login_passwordBox'>
            <input 
                className='login_password'
                type="password" 
                name="password"
                value={userForm.password} 
                onChange={changeTextField} 
                placeholder='비밀번호'
            />
        </div>
        <button type="submit" className='login_loginBtn'>로그인</button>
        <button type='button' className='login_pwFindBtn' onClick={handleFindUser}>비밀번호를 잊으셨나요?</button>

        {/* '또는' 부분 */}
        <div className="divider">
            <hr className="left" />
            <span>또는</span>
            <hr className="right" />
        </div>
        <button type="button" onClick={handleJoin} className='login_joinBtn'>새 계정 만들기</button>
    </form>
    </div>
  )
}

export default Login