import React from 'react'
import { useNavigate } from 'react-router-dom';
import instance from '../../axiosConfig';

function UserHome() {
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await instance.post('/user/logout', {}, {
        withCredentials: true
      })
      navigate('/userLogin')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <div>UserHome</div>
      <div>
        <button onClick={() => handleLogout()}> logout User</button>
      </div>
    </>
  )
}

export default UserHome