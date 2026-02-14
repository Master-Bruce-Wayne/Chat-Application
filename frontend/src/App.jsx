import './App.css'
import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import io from "socket.io-client";
import { useState,useEffect } from 'react';
import { setSocket } from './redux/socketSlice.js';

// components
import HomePage from './components/HomePage.jsx'
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'
import { setOnlineUsers } from './redux/userSlice.js';

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
  const {authUser, onlineUsers} = useSelector(store=>store.user);
  const {socket} =useSelector(store=>store.socket);
  const dispatch = useDispatch();

  useEffect(() =>{
    if(authUser) {
      const socket=io('http://localhost:8000',{
        query:{
          userId: authUser._id
        }
      });
      dispatch(setSocket(socket));

      socket.on('getOnlineUsers', (onlineUsers)=>{
        dispatch(setOnlineUsers(onlineUsers));
      });

      return ()=> {
        const currOnlineUsers = onlineUsers?.filter(
          uId => uId!==authUser?._id
        );
        
        dispatch(setOnlineUsers(currOnlineUsers)); 
        socket.close();
      }
    } else {
      if(socket) {
        socket.close();
        dispatch(setSocket(null));
      }
    }
  },[authUser]);

  return (
    <div className='p-4 h-screen flex items-center justify-center'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
