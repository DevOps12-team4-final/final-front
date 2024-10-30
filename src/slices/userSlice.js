import {createSlice} from '@reduxjs/toolkit';
import { join, login, logout } from '../apis/userApis';

// 이 Redux는 createSlice를 사용해 회원 상태를 관리하는 역할이다.
// 회원가입, 로그인, 로그아웃을 처리한다.
// 비동기 액션이 성공(fullfilled)하거나 실패(rejected)했을때 어떻게 업데이트 할지 정의한다.
const userSlice = createSlice({
    
    // 슬라이스의 이름을 정의한다.
    name: 'users',

    // 초기상태 정의한다.
    initialState: {
        // 로그인 상태인지 여부
        isLogin: false,
        // 로그인한 사용자 id 저장
        id: 0,
        // 로그인한 사용자 email 저장
        email: '',
        // 로그인한 사용자 nickname 저장
        nickname: '',
        // 로그인한 사용자 tel 저장
        tel: ''
    },
    // 상태 변경은 모두 비동기 액션을 처리하는 extraReducers에서 이루어진다.
    reducers: {

    },
    // 비동기 작업인 join, login, logout 같은 액션이 완료될때(fulfiiled),
    // 실패할때(rejected)상태를 업데이트하는 로직을 정의한다.
    // builder = 특정 액션
    extraReducers: (builder) => {

        // builder.addCase는 특정 액션이 발생했을 때, 그 액션에 대한 상태 업데이트를 정의해주는 함수이다.
        // state = 현재상태
        // action = dipatch(join),createAsyncThunk로 생성된 액션

        // 회원가입 성공했을때
        builder.addCase(join.fulfilled, (state, action) => {
            alert(`${action.payload.item.nickname}님 가입 축하드립니다.`);
            // Hooks는 함수형 컴포넌트에서만 사용가능하기 때문에
            // Hooks를 사용못하는 파일에서는 javascript의 기본 기능을 사용한다.
            return state;
        });
        // 회원가입 실패했을때 
        builder.addCase(join.rejected, (state, action) => {
            alert('에러가 발생했습니다.');
            return state;
        });

        // 로그인 성공했을때
        // action => {type: 'users/login', payload: response.data.item}
        builder.addCase(login.fulfilled, (state, action) => {
            alert(`${action.payload.item.nickname}님 환영합니다.`);
            sessionStorage.setItem('ACCESS_TOKEN', action.payload.item.token);
            console.log(sessionStorage.getItem('ACCESS_TOKEN'));

            console.log(action.payload.item.token);

            return {
                ...state,
                isLogin: true,
                id: action.payload.item.id,
                email: action.payload.item.email,
                nickname: action.payload.item.nickname,
                tel: action.payload.item.tel,
                profileImage: action.payload.item.profileImage
            };
        });

        // 로그인 실패했을때
        builder.addCase(login.rejected, (state, action) => {
            if(action.payload.statusMessage === 'email not exist') {
                alert("존재하지 않는 아이디입니다.");
                return state;
            }

            if(action.payload.statusMessage === 'wrong password') {
                alert("잘못된 비밀번호입니다.");
                return state;
            }

            return state;
        });

        // 로그아웃 성공했을때
        builder.addCase(logout.fulfilled, (state, action) => {
            alert("로그아웃 완료.");
            console.log(sessionStorage.getItem('ACCESS_TOKEN'));
            sessionStorage.removeItem("ACCESS_TOKEN");
            
            return {
                ...state,
                isLogin: false,
                id: 0,
                email: '',
                nickname: '',
                tel: ''
            }
        });
        builder.addCase(logout.rejected, (state, action) => {
            alert("에러가 발생했습니다.");
            return state;
        });
    }
});

export default userSlice.reducer;