import './App.css'
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from './pages/Signup';
import NoPage from './pages/NoPage';
import Forgot from './pages/Forgot';
import NewPassword from './pages/NewPassword';
import Dashboard from './pages/Dashboard';
import GetShortURL from './components/GetShortURL';

function App() {

  return (
    <>
      <Routes>
        <Route exact path="/" element={ <Login /> } />
        <Route exact path="/register" element={<Signup />} />
        <Route exact path="/forgot" element={<Forgot />} />
        <Route exact path="/reset/:id/:token" element={<NewPassword />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/shorternurl" element={<GetShortURL />} />
        <Route exact path="/*" element={<NoPage />} />
      </Routes>
    </>
  )
}

export default App
