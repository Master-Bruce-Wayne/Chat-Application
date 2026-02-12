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
    <div className='p-4 h-screen flex items-center justify-center'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
