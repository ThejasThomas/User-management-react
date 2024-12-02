import React,{useState} from "react";
import "./signup.css"
import axios from 'axios';
import {Link, useNavigate} from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

function UserSignup(){
    const [name,setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [image, setProfileImage] = useState(null);

    const [errors, setErrors] = useState({});

    const navigate = useNavigate();
     
    const validateForm = ()=>{
        const newErrors = {};

        const  trimmedName =  name.trim();
        const  trimmedEmail =  email.trim();
        const  trimmedPhone =  phone.trim();
        const trimmedPassword = password.trim();

        if(!trimmedName){
            newErrors.name = "Name is required";
        }else if(!/^[A-Za-z\s]+$/.test(trimmedName)){
            newErrors.name = "Name can only contain letters"
        }

        if (!trimmedEmail) {
            newErrors.email = "Email is required.";
        } else if (!/^[\w-.]+@gmail\.com$/.test(trimmedEmail)) {
            newErrors.email = "Email must be a valid Gmail address.";
        }

        if (!trimmedPhone) {
            newErrors.phone = "Phone number is required.";
        } else if (!/^\d{10}$/.test(trimmedPhone)) {
            newErrors.phone = "Phone number must be exactly 10 digits.";
        }

        if(!trimmedPassword){
            newErrors.password = "Password should not be empty."
        }else if(password.length < 6){
            newErrors.password = "Password shold contain atleast 6 digits"
        }
        
        if (!image) {
            newErrors.image = "Profile image is required.";
        }
    
        return newErrors;

    }


    const handleSubmit = async (e)=>{
        e.preventDefault();
       
        const validationErrors = validateForm()
        if(Object.keys(validationErrors).length > 0){
            setErrors(validationErrors);
            return;
        }
        
        try{
            const formData = new FormData();
              formData.append("name", name);
              formData.append("email", email);
              formData.append("phone", phone);
              formData.append("password", password);
          if (image) {
               formData.append("image", image); // Add the file to FormData
             }
           
            const response =await axios.post("http://localhost:3000/user/signup",formData,
                { headers: {
                'Content-Type': 'multipart/form-data', // Important for file uploads
              }})
              
              alert(response.data.message);
              console.log(response.data)
               navigate("/login");
        }catch(error){
            console.error(error)
            toast.error(error.response?.data?.message || 'Something went wrong');
        }

    }

  return(
    <div className="login-container">
    <form className="login-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>

        <label htmlFor="name">Full Name</label>
        <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter the Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            
        />
         {errors.name && <span className="error">{errors.name}</span>}
        <label htmlFor="email">Email</label>
        <input
            type="email"
            name="email"
            id="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
           
        />
          {errors.email && <span className="error">{errors.email}</span>}

        <label htmlFor="phone">Phone Number</label>
        <input
            type="tel"
            name="phone"
            id="phone"
            placeholder="+123456789"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            
        />
         {errors.phone && <span className="error">{errors.phone}</span>}
        
        <label htmlFor="password">Password</label>
        <input
            type="password"
            name="password"
            id="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
           
        />
        {errors.password && <span className="error">{errors.password}</span>}


        <label htmlFor="profileImage">Profile Image</label>
        <input
        type="file"
        name="profileImage"
        onChange={(e) => setProfileImage(e.target.files[0])} // Handle image file input
         />
        {errors.image && <span className="error">{errors.image}</span>}

        <button type="submit" className="submit-btn">Sign up</button>

        <p className="signin-text">
            Already have an account? <Link to="/login">Sign in</Link>
        </p>
    </form>
    <ToastContainer /> {/* Toast container for notifications */}
    </div>
  )
}

export default UserSignup