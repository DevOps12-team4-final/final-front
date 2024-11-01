import { createSlice } from '@reduxjs/toolkit';
import { get,remove } from '../apis/alarmApi';

const alarmSlice = createSlice({
  name: 'messages',
  initialState: {
    isGetInit: false,
    alarms:[]
  },
  reducers: {
    addMessage: (state, action) => {
      console.log(state)
      console.log(action.payload)
      state.alarms.unshift(action.payload); // 받은 메시지를 배열의 앞에 추가
    },
  },

  extraReducers: (builder) => {

    // builder.addCase는 특정 액션이 발생했을 때, 그 액션에 대한 상태 업데이트를 정의해주는 함수이다.
    // state = 현재상태
    // action = dipatch(join),createAsyncThunk로 생성된 액션

    // 값가져오기
    builder.addCase(get.fulfilled, (state, action) => {
        //item 필터링 시도
        if(state.isGetInit == false){
          console.log(action.payload)
          state.alarms = action.payload
          state.isGetInit = true
        }
        return state;
    });
    builder.addCase(get.rejected, (state, action) => {
        return state;
    });

    //알람 지우기
    builder.addCase(remove.fulfilled, (state, action) => {
      console.log(action.payload)
      return {
        ...state,
        alarms: state.alarms.filter(
            (message) =>
                message.url !== action.payload.url ||
                message.type !== action.payload.type
        )
    };
    
    });
    builder.addCase(remove.rejected, (state, action) => {
        console.log("fail")
        return state;
    });
  }

});

export const { addMessage} = alarmSlice.actions;
export default alarmSlice.reducer;