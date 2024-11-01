import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// createAsyncThunk로 만들어진 비동기 통신함수는 action creator 함수이다.
// action => {type: 'users/~,
//            payload: respose.data or error 객체}

// 회원가입
export const join = createAsyncThunk(
  // type
  "users/join",

  // payload
  async (user, thunkApi) => {
    try {
      const response = await axios.post("/users/join", user);

      return response.data;
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

// 로그인
export const login = createAsyncThunk(
  // type
  "users/login",

  // payload
  async (user, thunkApi) => {
    try {
      const response = await axios.post("/users/login", user);

      return response.data;
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

// 로그아웃
export const logout = createAsyncThunk(
  // type
  "user/logout",

  // payload
  async (_, thunkApi) => {
    try {
      const token = sessionStorage.getItem("ACCESS_TOKEN");

      // 토큰이 없으면 로그아웃 요청을 보내지 않음
      if (!token) {
        throw new Error("No token found");
      }
      const response = await axios.get(`/users/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data.item;
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);

// 마이페이지
export const getMyPage = createAsyncThunk(
  "user/my_page",

  async (user, thunkApi) => {
    try {
      const response = await axios.get("/users/my_page", user);

      return response.data;
    } catch (e) {
      return thunkApi.rejectWithValue(e);
    }
  }
);
