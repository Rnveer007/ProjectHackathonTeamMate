import instance from '../../axiosConfig'
import { useNavigate } from 'react-router-dom'

function AdminHome() {
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      await instance.post('/admin/logout', {}, {
        withCredentials: true
      })
      navigate('/adminLogin')
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