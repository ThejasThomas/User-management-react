import axios from "axios"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link,useNavigate } from "react-router-dom"
import { addUser } from "../../../redux/userSlice"
import { toast,ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import './login.css'



function UserLogin(){
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')


const [errors,setErrors] = useState({})
const navigate=useNavigate()
const dispatch=useDispatch()

const validateForm =()=>{
    const newErrors ={}


    const trimmedEmail = email.trim()
    const trimmedPassword =password.trim()



    if(!trimmedEmail) {
        newErrors.email = 'Enter should not be empty.'
    }else if (!/^[\w-.]+@gmail\.com$/.test(trimmedEmail)){
        newErrors.email = 'Email must be a valid Gmail Address.';
    }
    if(!trimmedPassword) {
        newErrors.password ='Password should not be empty.'
    }else if(password.length < 6){
        newErrors.password = 'Password should contain atleast 6 characters';
    } 
    return newErrors;
}

const handleSubmit = async (e) => {
    e.preventDefault()

    const validationErrors = validateForm()
    if(Object.keys(validationErrors).length >0){
        setErrors(validationErrors)
        return;
    }
    try {
        const response=await axios.post('http://localhost:3000/user/login',{
            email,
            password
        },{withCredentials:true})

        dispatch(addUser(response.data))

            navigate('./home')
        
    } catch (err) {
        toast.error(err.response?.data?.message || 'Login failed')
    }
}

return (
    <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <div className="form-group">
                <label htmlFor="email">Email</label><br />
                <input
                    type="email"
                    id="email"
                    placeholder="Enter Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <span className="error">{errors.email}</span>}
            </div>

            <div className="form-group">
                <label htmlFor="password">Password</label><br />
                <input
                    type="password"
                    id="password"
                    placeholder="Enter Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <span className="error">{errors.password}</span>}
            </div>

            <button type="submit" className="login-btn">
                Login
            </button>

            <p className="signup-prompt">
                Don't have an account? <Link to="/">Sign-Up</Link>
            </p>
        </form>

        <ToastContainer /> {/* Toast container for error messages */}
    </div>
);
}
export default UserLogin

