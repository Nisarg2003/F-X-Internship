import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Register from './Pages/Auth/register';
import Login from './Pages/Auth/login';
import HomePage from './Pages/Home/HomePage';
import UpcomingTask from './Pages/Home/UpcomingTask';
import TodaysTask from './Pages/Home/TodaysTask';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<ProtectedRoute><HomePage></HomePage></ProtectedRoute>} />
        <Route path='/upcoming' element={<ProtectedRoute><UpcomingTask></UpcomingTask></ProtectedRoute>} />
        <Route path='/todaysTask' element={<ProtectedRoute><TodaysTask></TodaysTask></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export function ProtectedRoute(props) {
  if (localStorage.getItem('user')) {
    return props.children
  } else {
    return <Navigate to="/login" />
  }
}

export default App;
