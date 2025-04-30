import instance from '../../axiosConfig'

function AdminHome() {

  async function handleLogout() {
    try {
      await instance.post('/admin/logout', {}, {
        withCredentials: true
      })
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <div>AdminHome</div>
      <div>
        <button onClick={() => handleLogout()}> logout Admin</button>
      </div>
    </>
  )
}

export default AdminHome