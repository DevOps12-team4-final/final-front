<<<<<<< HEAD
import {configureStore, combineReducers} from '@reduxjs/toolkit';
import userSlice from '../slices/userSlice';
import alarmSlice from '../slices/alarmSlice';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist';
import storageSession from 'redux-persist/es/storage/session';

const reducers = combineReducers({
    userSlice,
    alarmSlice,
});

const persistConfig = {
    key: 'root',
    storage: storageSession
};

const persistreducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistreducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [FLUSH, PAUSE, PERSIST, PURGE, REHYDRATE, REGISTER]
            }
        })
});
=======
import {configureStore, combineReducers} from '@reduxjs/toolkit';
import userSlice from '../slices/userSlice';
import {
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from 'redux-persist';
import storageSession from 'redux-persist/es/storage/session';

// 여러개의 리듀서를 하나로 합치는 역할이다.
const reducers = combineReducers({
    userSlice,
});

// Redux의 상태를 세션 스토리지에 저장하거나 복원할 때 필요한 설정을 담고 있습니다. 
// key: 이 키는 세션 스토리지에 저장될 때 사용되며, 기본적으로 root로 설정되어 있습니다.
// storage: 어디에 상태를 저장할지 결정하는 옵션입니다.
const persistConfig = {
    key: 'root',
    storage: storageSession
};

// persistReducer는 Redux 상태를 세션 스토리지에 저장할 수 있도록 리듀서를 확장합니다.
// 이 확장된 리듀서는 Redux 상태가 변경될 때마다 자동으로 세션 스토리지에 저장하고, 새로고침 시에도 세션 스토리지에서 상태를 복원합니다.
const persistreducer = persistReducer(persistConfig, reducers);

// **configureStore**는 Redux Toolkit에서 제공하는 함수로, Redux 스토어를 설정합니다.
// reducer: 확장된 persistreducer를 사용해 Redux 상태를 관리합니다.
// middleware: Redux의 기본 미들웨어에 추가적인 설정을 적용합니다. 
//             redux-persist와 관련된 액션들이 직렬화 가능하지 않다는 경고를 방지하기 위해 
//             serializableCheck 옵션을 사용해 FLUSH, PAUSE, PERSIST, PURGE, REHYDRATE, REGISTER 같은 액션들을 무시하도록 설정합니다.
export const store = configureStore({
    reducer: persistreducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [FLUSH, PAUSE, PERSIST, PURGE, REHYDRATE, REGISTER]
            }
        })
});

export default store; // default export로 설정
>>>>>>> origin/feature/mypage
