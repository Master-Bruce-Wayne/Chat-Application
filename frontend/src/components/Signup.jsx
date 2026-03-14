import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios";
import toast from 'react-hot-toast';
import { IoPersonOutline, IoLockClosedOutline, IoEyeOutline, IoEyeOffOutline, IoPersonAddOutline } from 'react-icons/io5';

const Signup = () => {
    const [user,setUser]=useState({
        fullName:"", username:"", password:"",
        confirmPassword:"", gender:""
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate =useNavigate();

    const handleGender = (gender) => {
        setUser({...user,gender:gender});
    };

    const onSubmitHandler = async(e) => {
        e.preventDefault(); 
        // console.log(user);

        try{
            const res=await axios.post('http://localhost:8000/api/v1/user/register', user, {
                headers: { 'Content-Type':'application/json' },
                withCredentials:true
            });
            // console.log(res);

            if(res.data.success) {
                navigate("/login");
                toast.success(res.data.message || "User registered successfully!");
            }
        } catch(err) {
            // console.log(err);
            toast.error(err.response.data.message || "Failed to register")
        } finally{
            setUser({
                fullName:"", username:"", password:"",
                confirmPassword:"", gender:""
            });
        }
    };

  return (
    <div className="min-w-[320px] w-full max-w-md mx-auto">
        <div className="w-full p-6 rounded-xl bg-slate-950/40 backdrop-blur-md border border-white/10 shadow-2xl">
            <h1 className="text-2xl font-bold text-center text-white">Signup</h1>
            <form onSubmit={onSubmitHandler} className="mt-4">
                <div className="mb-3">
                    <label className="block text-slate-400 text-sm font-medium mb-1.5">Full Name</label>
                    <div className="relative">
                        <IoPersonOutline className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                        <input
                            value={user.fullName}
                            onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                            type="text"
                            placeholder="Full Name"
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <label className="block text-slate-400 text-sm font-medium mb-1.5">Username</label>
                    <div className="relative">
                        <IoPersonOutline className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                        <input
                            value={user.username}
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                            type="text"
                            placeholder="Username"
                        />
                    </div>
                </div>

                <div className="mb-3">
                    <label className="block text-slate-400 text-sm font-medium mb-1.5">Password</label>
                    <div className="relative">
                        <IoLockClosedOutline className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                        <input
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            className="w-full pl-10 pr-12 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
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

                <div className="mb-3">
                    <label className="block text-slate-400 text-sm font-medium mb-1.5">Confirm Password</label>
                    <div className="relative">
                        <IoLockClosedOutline className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
                        <input
                            value={user.confirmPassword}
                            onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })}
                            className="w-full pl-10 pr-12 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword((p) => !p)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                        >
                            {showConfirmPassword ? <IoEyeOffOutline className="w-5 h-5" /> : <IoEyeOutline className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-4 my-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="gender"
                            checked={user.gender === "male"}
                            onChange={() => handleGender("male")}
                            className="w-4 h-4 rounded-full border-white/20 bg-white/5 text-indigo-500 focus:ring-indigo-500/50"
                        />
                        <span className="text-slate-400 text-sm">Male</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="radio"
                            name="gender"
                            checked={user.gender === "female"}
                            onChange={() => handleGender("female")}
                            className="w-4 h-4 rounded-full border-white/20 bg-white/5 text-indigo-500 focus:ring-indigo-500/50"
                        />
                        <span className="text-slate-400 text-sm">Female</span>
                    </label>
                </div>

                <p className="text-slate-400 text-sm mb-4">
                    Already have an account?{" "}
                    <Link to="/login" className="text-indigo-400 hover:text-indigo-300 cursor-pointer">Login</Link>
                </p>

                <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 rounded-xl py-2.5 font-medium bg-gradient-to-br from-indigo-500/80 to-purple-600/80 text-white shadow-[0_0_15px_rgba(99,102,241,0.4)] hover:opacity-90 transition-opacity cursor-pointer"
                >
                    <IoPersonAddOutline className="w-5 h-5" />
                    Sign Up
                </button>
            </form>
        </div>
    </div>
  )
}

export default Signup