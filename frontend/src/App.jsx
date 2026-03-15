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

// utilities
import LiquidEther from './component/utilities/LiquidEther.jsx';
import Galaxy from './component/utilities/Galaxy.jsx';

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
    <>
      <div className="fixed inset-0 -z-10">
        {/* <LiquidEther
          colors={[ '#5227FF', '#FF9FFC', '#B19EEF' ]}
          mouseForce={20}
          cursorSize={100}
          isViscous
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
          color0="#5227FF"
          color1="#FF9FFC"
          color2="#B19EEF"
        /> */}
        <Galaxy 
            mouseRepulsion
            mouseInteraction
            density={1}
            glowIntensity={0.3}
            saturation={0}
            hueShift={140}
            twinkleIntensity={0.3}
            rotationSpeed={0.1}
            repulsionStrength={2}
            autoCenterRepulsion={0}
            starSpeed={0.5}
            speed={1}
        />
      </div>
      <div className="relative z-10 min-h-screen w-full">
        <RouterProvider router={router} />
      </div>
    </>
  )
}

export default App