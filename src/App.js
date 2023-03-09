import store from "./store/store";
import { Provider } from 'react-redux';
import Wallet from './pages/Wallet';
import Profile from './pages/Profile';
import SignIn from './pages/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Wallet/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/login" element={<SignIn/>}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
