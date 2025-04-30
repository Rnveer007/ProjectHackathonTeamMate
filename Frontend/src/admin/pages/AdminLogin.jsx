import { useState } from 'react'
import instance from '../../axiosConfig';
import { Link, useNavigate } from 'react-router-dom';


function AdminLogin() {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: '',
        password: '',
    })

    function handleChange(e) {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }))
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await instance.post('/admin/login', form, {
                withCredentials: true
            })
            // console.log(response.data)
            navigate('/adminHome')
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <>
            <div>
                <h1>Login Admin</h1>
                <form onSubmit={handleSubmit}>
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
                    <button type='submit'>Login</button>

                    <div className="mt-4 text-center">
                        <Link
                            to="/adminRegister"
                        >
                            Register as Admin
                        </Link>
                    </div>

                </form>
            </div>

        </>
    )
}

export default AdminLogin