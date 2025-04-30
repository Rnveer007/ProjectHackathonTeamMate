import React from 'react'
function UserHome() {

  async function handleLogout() {
    try {
      await instance.post('/user/logout', {}, {
        withCredentials: true
      })
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