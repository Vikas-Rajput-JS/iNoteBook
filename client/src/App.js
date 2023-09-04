import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Signup from './Component/Signup';
import Login from './Component/Login';
import Home from './Component/Home';

function App() {
  return (
    <div className="App w-[100%] h-screen ">
      <Routes>
<Route path='/' element={<Signup/>}></Route>
<Route path='/login' element={<Login/>}></Route>
<Route path='/Home' element={<Home/>}></Route>

      </Routes>
    </div>
  );
}

export default App;
