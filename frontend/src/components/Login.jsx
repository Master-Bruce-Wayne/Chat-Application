import React, {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/userSlice';
import { User, Lock, Eye, EyeOff, LogIn, MessageSquareText } from 'lucide-react';

const Login = () => {
    const [user,setUser]=useState({ username:"", password:"" });
    const [showPassword, setShowPassword] = useState(false);
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const onSubmitHandler = async(e) => {
        e.preventDefault(); 
        try{
            const res=await axios.post('http://localhost:8000/api/v1/user/login', user, {
                headers: { 'Content-Type':'application/json' },
                withCredentials:true
            });

            if(res.data.success) {
                navigate("/");
                dispatch(setAuthUser(res.data));
                toast.success(res.data.message || "Logged in successfully!");
            }
        } catch(err) {
            toast.error(err.response.data.message || "Failed to login");
        } finally{
            setUser({ username:"", password:"" });
        }
    };

  return (
    <div className="flex items-center justify-center min-h-screen w-full relative z-10 p-4">
        <div className="min-w-[320px] w-full max-w-md bg-slate-900/60 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">

            {/* Brand header */}
            <div className="flex flex-col items-center gap-3 mb-8">
                <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 shadow-[0_0_20px_rgba(99,102,241,0.3)]">
                    <MessageSquareText strokeWidth={1.5} className="w-8 h-8 text-indigo-400" />
                </div>
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-white tracking-tight">Welcome back</h1>
                    <p className="text-slate-400 text-sm mt-1">Sign in to continue chatting</p>
                </div>
            </div>

            <form onSubmit={onSubmitHandler} className="space-y-4">
                <div>
                    <label className="block text-slate-300 text-sm font-medium mb-1.5">Username</label>
                    <div className="relative">
                        <User strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 pointer-events-none" />
                        <input
                            value={user.username}
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                            className="w-full rounded-xl pl-10 pr-4 py-3 bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500/60 focus:border-indigo-500/40 outline-none transition-all"
                            type="text"
                            placeholder="Enter your username"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-slate-300 text-sm font-medium mb-1.5">Password</label>
                    <div className="relative">
                        <Lock strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400 pointer-events-none" />
                        <input
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            className="w-full rounded-xl pl-10 pr-12 py-3 bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-indigo-500/60 focus:border-indigo-500/40 outline-none transition-all"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((p) => !p)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword
                                ? <EyeOff strokeWidth={1.5} className="w-4.5 h-4.5" />
                                : <Eye strokeWidth={1.5} className="w-4.5 h-4.5" />
                            }
                        </button>
                    </div>
                </div>

                <p className="text-slate-400 text-sm pt-1">
                    Don&apos;t have an account?{" "}
                    <Link to="/register" className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors cursor-pointer">Sign up</Link>
                </p>

                <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-500 hover:to-indigo-400 text-white font-semibold py-3 rounded-xl transition-all btn-glow cursor-pointer mt-2"
                >
                    <LogIn strokeWidth={1.5} className="w-4.5 h-4.5" />
                    Sign In
                </button>
            </form>
        </div>
    </div>
  )
}

export default Login