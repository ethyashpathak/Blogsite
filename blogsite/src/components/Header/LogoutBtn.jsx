import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'

function LogoutBtn() {
    const dispatch=useDispatch()
    const logoutHandler=()=>{
        authService.logout().then(()=>{
            dispatch(logout())
        })
    }
    return (
        <button
            className="inline-block px-6 py-2 rounded-full font-semibold bg-gradient-to-r from-red-400 to-pink-500 text-white shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg hover:from-pink-500 hover:to-red-400 dark:from-red-600 dark:to-pink-700 dark:hover:from-pink-700 dark:hover:to-red-600 focus:outline-none focus:ring-2 focus:ring-pink-400"
            onClick={logoutHandler}
        >
            Logout
        </button>
    )
}

export default LogoutBtn
