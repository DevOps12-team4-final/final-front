import { createSlice } from '@reduxjs/toolkit';

const alarmSlice = createSlice({
  name: 'messages',
  initialState: [],
  reducers: {
    addMessage: (state, action) => {
      console.log(state)
      state.unshift()(action.payload); // 받은 메시지를 배열의 앞에 추가
    },
    removeMessage: (state, action) => {
        return state.filter((message) => message.id !== action.payload); // id를 기준으로 메시지 제거
      },
  },
});

export const { addMessage, removeMessage  } = alarmSlice.actions;
export default alarmSlice.reducer;