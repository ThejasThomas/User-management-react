import React, { useEffect, useState } from 'react';
import './adminEdit.css'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function AdminEdit(){
    const navigate = useNavigate();
    const { id } = useParams();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [image, setProfileImage] = useState(null);
    const [errors, setErrors] = useState({});
    const [showSuccessAlert, setShowSuccessAlert] = useState(false); 

    const validateForm = () => {
        const newErrors = {};

        
        const trimmedName = name.trim();
        const trimmedEmail = email.trim();
        const trimmedPhone = phone.trim();

        
        if (!trimmedName) {
            newErrors.name = "Name is required.";
        } else if (!/^[A-Za-z\s]+$/.test(trimmedName)) {
            newErrors.name = "Name can only contain letters.";
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

        
        if (!image) {
            newErrors.image = "Profile image is required.";
        }

        return newErrors;
    };
    useEffect(() => {
        function fetchUser() {
            axios.get(`http://localhost:3000/admin/editUser/${id}`, { withCredentials: true })
                .then((res) => {
                    setName(res.data.name);
                    setEmail(res.data.email);
                    setPhone(res.data.phone);
                    setProfileImage(res.data.profileImage);
                    console.log("@admin edit response", res.data);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        fetchUser();
    }, [id]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await axios.put("http://localhost:3000/admin/update", { image, id, name, email, phone }, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true,
            });
            console.log(response.data);
            
            
            setShowSuccessAlert(true);

           
            setTimeout(() => {
                setShowSuccessAlert(false);
                navigate("/dashboard");
            }, 2000);

        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="admin-edit-container">
            <div className="admin-edit-card">
                <h2>Edit User</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="input-field"
                            placeholder="Enter name"
                        />
                        {errors.name && <span className="error">{errors.name}</span>}
                    </div>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="input-field"
                            placeholder="Enter email"
                        />
                        {errors.email && <span className="error">{errors.email}</span>}
                    </div>
                    <div className='form-group'>
                        <label htmlFor="phone">Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            id="phone"
                            placeholder="+123456789"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                        {errors.phone && <span className="error">{errors.phone}</span>}
                    </div>
                    <div className="form-group">
                        <label>Profile Image</label>
                        <input
                            type="file"
                            onChange={(e) => setProfileImage(e.target.files[0])}
                            className="input-file"
                        />
                        {errors.image && <span className="error">{errors.image}</span>}
                    </div>
                    <button type="submit" className="btn submit-btn">Update</button>
                </form>

                {/* Success Alert */}
                {showSuccessAlert && (
                    <div className="success-alert">
                        User data has been successfully updated!
                    </div>
                )}
            </div>
        </div>
    );
}
export default AdminEdit;