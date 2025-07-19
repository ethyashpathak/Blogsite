import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import {login as authLogin} from '../store/authSlice'
import {Button,Input,Logo} from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import {useForm} from "react-hook-form"

function Login() {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const {register,handleSubmit}=useForm()
    const [error,setError]=useState("")
    
    const login=async(data)=>{
        setError("")
        try {
            const session=await authService.login(data)
            if(session){
               const userData=await authService.getCurrentUser()
                if(userData){
                    dispatch(authLogin(userData));
                    navigate("/")
                }
            }
        } catch (error) {
            setError(error.message)
        }
    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-12 px-4">
            <div className="mx-auto w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-10 border border-gray-200/60 dark:border-gray-700 relative">
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full p-1 shadow-lg">
                    <span className="inline-block w-full max-w-[90px] bg-white dark:bg-slate-900 rounded-full p-2">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="mt-8 text-center text-3xl font-extrabold leading-tight bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow-lg">Sign in to your account</h2>
                <p className="mt-3 text-center text-base text-gray-500 dark:text-gray-400">
                    Don&apos;t have any account?&nbsp;
                    <Link
                        to="/signup"
                        className="font-semibold text-purple-600 dark:text-purple-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 underline-offset-2 hover:underline"
                    >
                        Sign Up
                    </Link>
                </p>
                {error && <p className="text-red-600 dark:text-red-400 mt-8 text-center font-semibold animate-pulse">{error}</p>}
                <form onSubmit={handleSubmit(login)} className="mt-8">
                    <div className="space-y-6">
                        <Input
                            label="Email: "
                            placeholder="Enter your email"
                            type="email"
                            className="rounded-lg border border-gray-300 dark:border-gray-700 focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-900 shadow-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-gray-400"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                    "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input
                            label="Password: "
                            type="password"
                            placeholder="Enter your password"
                            className="rounded-lg border border-gray-300 dark:border-gray-700 focus:border-pink-500 dark:focus:border-pink-400 focus:ring-2 focus:ring-pink-200 dark:focus:ring-pink-900 shadow-sm bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-gray-400"
                            {...register("password", {
                                required: true,
                            })}
                        />
                        <Button
                            type="submit"
                            className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold shadow-md hover:scale-105 hover:shadow-lg transition-all duration-300"
                        >Sign in</Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
