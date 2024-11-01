import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// createAsyncThunk로 만들어진 비동기 통신함수는 action creator 함수이다.
// action => {type: 'users/~,
//            payload: respose.data or error 객체}


const searverUrl ="http://localhost:9090/notifications"

//가져오기
export const get = createAsyncThunk(
  // type
  "alarm/get",
  // payload
  async (userId, thunkApi) => {
    try {
      const response = await axios.get(`${searverUrl}/user/${userId}`);
      const dataList =  response.data.item
      const returnList = [];
      for (const data of dataList) {
        const message = JSON.parse(data.alarmContent)
        returnList.push(message);
      }
      return returnList;
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

//제거
export const remove = createAsyncThunk(
  // type
  "alarm/delete",
  // payload
  async (alarmId, thunkApi) => {
    try {
      const response = await axios.put(`${searverUrl}/${alarmId}/read`)
      return alarmId;
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);


