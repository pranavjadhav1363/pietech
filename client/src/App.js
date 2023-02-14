import logo from './logo.svg';
import './App.css';
import Registration from './components/Registration';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import MainPage from './components/MainPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/register' element={<Registration />} />
        <Route path='/' element={<Login />} />
        <Route path='/mainpage' element={<MainPage />} />
      </Routes>
    </div>
  );
}

export default App;
