import ProtectHome from "./components/protect/userLogin"
import  Home from "./components/user/home/home"
import {BrowserRouter, Route,Routes } from "react-router-dom"
import ProtectEdit from "./components/protect/userAuth"
import UserSignup from "./components/user/signup/signup"
import UserLogin from './components/user/login/login'
import Update from './components/user/update/update'
import AdminLogin from "./components/admin/login/adminLogin"
import AdminHome from "./components/admin/home/adminHome"
import AdminDash from './components/admin/dashboard/adminDashboard'
import AdminAuth from "./components/protect/adminAuth"
import AdminiLoginAuth from "./components/protect/adminLogin"
import AdminEdit from "./components/admin/edit/adminEdit"
import AddUser from './components/admin/adduser/addUser'
import NotFound from "./components/not-found/notfound"
function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<ProtectEdit><UserSignup /></ProtectEdit> } />
    <Route path="/home" element={<ProtectHome><Home/></ProtectHome>} />
    <Route path="/login" element={<ProtectEdit><UserLogin /></ProtectEdit>} />
    <Route path="/update" element={<ProtectHome><Update/></ProtectHome>} />
    <Route path="/admin" element={<AdminAuth><AdminLogin/></AdminAuth>} />
    <Route path="/adminHome" element ={<AdminiLoginAuth><AdminHome/></AdminiLoginAuth>}/>
    <Route path="/dashboard" element={<AdminiLoginAuth><AdminDash/></AdminiLoginAuth>} />
    <Route path="/adminedit/:id" element={<AdminiLoginAuth><AdminEdit/></AdminiLoginAuth>} />
    <Route path="/adminadd" element={<AdminiLoginAuth><AddUser/></AdminiLoginAuth>} />
    <Route path="*" element={<NotFound/>} />


     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
