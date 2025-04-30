import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import instance from '../../axiosConfig';

function AddHackathon() {
    const [form, setForm] = useState({
        name: "",
        mode: "",
        description: "",
        date: "",
        registrationLink: "",
        hackathon: "",
        image: null,
    });

    const navigate = useNavigate();

    function handleChange(e) {
        const { name, value, files } = e.target;
        if (name === "image") {
            setForm((prev) => ({ ...prev, image: files[0] }));
        } else {
            setForm((prev) => ({ ...prev, [name]: value }));
        }
    }

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            const data = new FormData();
            data.append("name", form.name);
            data.append("mode", form.mode);
            data.append("description", form.description);
            data.append("date", form.date);
            data.append("registrationLink", form.registrationLink);
            data.append("hackathon", form.hackathon); 
            if (form.image) {
                data.append("image", form.image);
            }

            await instance.post(`/form/submit`, data, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            navigate("/admin/home");
        } catch (error) {
            if (error.response) {
                console.error("Server Error:", error.response.data);
            } else {
                console.error("Submission Error:", error.message);
            }
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name='name'
                placeholder='Enter Name'
                value={form.name}
                onChange={handleChange}
            />

            <select
                name="mode"
                value={form.mode}
                onChange={handleChange}
            >
                <option disabled value="">Mode</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
            </select>

            <textarea
                name="description"
                placeholder="Description"
                value={form.description}
                onChange={handleChange}
            />

            <input
                type="date"
                name='date'
                value={form.date}
                onChange={handleChange}
            />

            <input
                type="text"
                name='registrationLink'
                placeholder='Registration Link'
                value={form.registrationLink}
                onChange={handleChange}
            />

            <input
                type="text"
                name='hackathon'
                placeholder='Hackathon Link'
                value={form.hackathon}
                onChange={handleChange}
            />

            <input
                type="file"
                name="image"
                onChange={handleChange}
            />

            <button type='submit'>Submit</button>
        </form>
    );
}

export default AddHackathon;
