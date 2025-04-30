import { createBrowserRouter, RouterProvider } from "react-router-dom"
import First from "./First"
import UserHome from "./user/pages/UserHome"
import UserLogin from "./user/pages/UserLogin"
import UserRegister from "./user/pages/UserRegister"
import AdminLogin from "./admin/pages/AdminLogin"
import AdminHome from "./admin/pages/AdminHome"
import AdminRegister from "./admin/pages/AdminRegister"
import AddHackathon from "./admin/pages/AddHackathon"


const router = createBrowserRouter([
  {
    path: "/",
    element: <First />,
    children: [
      {
        index: true,
        element:
          <UserHome />
      },
      {
        path: "userLogin",
        element:
          <UserLogin />
      },
      {
        path: "userRegister",
        element:
          <UserRegister />
      },
      {
        path: "adminLogin",
        element:
          <AdminLogin />
      },
      {
        path: "adminHome",
        element:
          <AdminHome />
      },
      {
        path: "adminRegister",
        element:
          <AdminRegister />
      },
      {
        path: "addHackathon",
        element:
          <AddHackathon />
      },
    ]
  }
])

function App() {

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
