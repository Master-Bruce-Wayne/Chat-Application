import React, { useEffect } from 'react'
import axios from 'axios';
import {useDispatch} from "react-redux"
import { setOtherUsers, setOtherUsersOrig } from '../redux/userSlice.js';

const useGetOtherUsers = () => {
    const dispatch =useDispatch();

  useEffect(() =>{
    const fetchOtherUsers = async()=> {
        try {
            axios.defaults.withCredentials=true;
            const res=await axios.get('http://localhost:8000/api/v1/user/');
            // console.log(res);

            // store
            dispatch(setOtherUsers(res.data));
            dispatch(setOtherUsersOrig(res.data));
        } catch(err) {
            console.log(err);
        }
    }
    fetchOtherUsers();
  }, [])
}

export default useGetOtherUsers