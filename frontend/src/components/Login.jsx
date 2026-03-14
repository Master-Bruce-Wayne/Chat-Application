import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/userSlice';
import { IoPersonOutline, IoLockClosedOutline, IoEyeOutline, IoEyeOffOutline, IoLogInOutline } from 'react-icons/io5';

const Login = () => {
    const [user,setUser]=useState({ username:"", password:"" });
    const [showPassword, setShowPassword] = useState(false);
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const onSubmitHandler = async(e) => {
        e.preventDefault(); 
        // console.log(user);
        try{
            const res=await axios.post('http://localhost:8000/api/v1/user/login', user, {
                headers: { 'Content-Type':'application/json' },
                withCredentials:true
            });
            // console.log(res);

            if(res.data.success) {
                navigate("/");
                dispatch(setAuthUser(res.data));
                toast.success(res.data.message || "Logged in successfully!");
            }
        } catch(err) {
            // console.log(err);
            toast.error(err.response.data.message || "Failed to login");
        } finally{
            setUser({ username:"", password:"" });
        }
    };

  return (
    <div className="flex items-center justify-center min-h-screen w-full relative z-10 p-4">
        <div className="min-w-[320px] w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl">
            <h1 className="text-2xl font-bold text-center text-white">Login</h1>
            <form onSubmit={onSubmitHandler} className="mt-6">
                <div className="mb-4">
                    <label className="block text-slate-300 text-sm font-medium mb-1.5">Username</label>
                    <div className="relative">
                        <IoPersonOutline className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                        <input
                            value={user.username}
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                            className="w-full rounded-xl pl-10 pr-4 py-3 bg-white/5 border border-white/10 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 outline-none"
                            type="text"
                            placeholder="Username"
                        />
                    </div>
                </div>

                <div className="mb-4">
                    <label className="block text-slate-300 text-sm font-medium mb-1.5">Password</label>
                    <div className="relative">
                        <IoLockClosedOutline className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                        <input
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            className="w-full rounded-xl pl-10 pr-12 py-3 bg-white/5 border border-white/10 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-indigo-500 outline-none"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((p) => !p)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? <IoEyeOffOutline className="w-5 h-5" /> : <IoEyeOutline className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                <p className="text-slate-300 text-sm mb-4">
                    Don&apos;t have an account?{" "}
                    <Link to="/register" className="text-indigo-400 hover:text-indigo-300 cursor-pointer">Signup</Link>
                </p>

                <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-indigo-500/20 cursor-pointer"
                >
                    <IoLogInOutline className="w-5 h-5" />
                    Login
                </button>
            </form>
        </div>
    </div>
  )
}

export default Login