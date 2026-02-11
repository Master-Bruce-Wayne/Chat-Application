import './App.css'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'

// components
import HomePage from './components/HomePage.jsx'
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>
  }, 
  {
    path:"/register",
    element:<Signup />
  },
  {
    path:"/login",
    element:<Login/>
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
