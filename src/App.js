import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store'; // 방금 만든 store 파일 가져오기
import Login from './pages/Login';
import Post from './pages/Post';
import Join from './pages/Join';
import Logout from './pages/Logout';
import JoinTelVer from './pages/JoinTelVer';
import FindCodeVer from './pages/FindCodeVer';
import FindTelInput from './pages/FindTelInput';
import ResetPw from './pages/ResetPw';
import Feed from './pages/followingfeed/Feed';
import SearchPage from './pages/SearchPage';

function App() {

  return (
    <Provider store={store}> {/* Redux Provider로 감싸기 */}
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/posts" element={<Post />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/jointelver" element={<JoinTelVer />} />
          <Route path="/findtelinput" element={<FindTelInput />}/>
          <Route path="/findcodever" element={<FindCodeVer />} />
          <Route path="/resetpw" element={<ResetPw />} />
          <Route path="/feed" element={<Feed />} />
          <Route path="/searchPage" element={<SearchPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;