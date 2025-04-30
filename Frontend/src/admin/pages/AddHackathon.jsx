import React, { useState } from 'react'
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
            await instance.post('/form/submit', { form }, {
                withCredentials: true
            })
        } catch (error) {
            console.log(error);
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
                onChange={handleChange} />

            <button type='submit'>Submit</button>
        </form>
    );
}

export default AddHackathon;
