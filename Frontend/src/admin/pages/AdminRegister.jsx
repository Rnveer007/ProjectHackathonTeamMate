import React, { useState } from 'react'
import instance from '../../axiosConfig';
import { Link, useNavigate } from 'react-router-dom';

function AdminRegister() {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    })

    function handleChange(e) {
        const { name, value } = e.target
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await instance.post('/admin/register', form, {
                withCredentials: true
            })
            // console.log(response.data)
            navigate("/adminLogin")
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            <div>
                <h1>Register as Admin</h1>
                <form onSubmit={handleSubmit}>

                    <input
                        type="text"
                        name='name'
                        placeholder='Enter Name'
                        value={form.name}
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        name='email'
                        placeholder='Enter Email'
                        value={form.email}
                        onChange={handleChange}
                    />
                    <input
                        type="Password"
                        name='password'
                        placeholder='Enter Password'
                        value={form.password}
                        onChange={handleChange}
                    />
                    <button type='submit'>Register</button>
                    <div>
                        <Link
                            to="/adminLogin"
                        >
                            Login as Admin
                        </Link>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AdminRegister