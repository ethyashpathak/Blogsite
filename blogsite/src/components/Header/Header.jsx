import React, { useState,useEffect } from 'react'
import {Container,Logo,LogoutBtn} from '../index'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {Sun,Moon} from 'lucide-react'

function Header() {
    const authStatus=useSelector((state)=>state.auth.status)
    const navigate=useNavigate()
    const [hoveredItem, setHoveredItem] = useState(null)
     const [isDark, setIsDark] = useState(() =>
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

    const navItems=[
        {
            name:'Home',
            slug:"/",
            active:true
        },
        {
            name:"Login",
            slug:"/login",
            active:!authStatus,
        },
        {
            name:"Signup",
            slug:"/signup",
            active:!authStatus
        },
        {
            name:"All Posts",
            slug:"/all-posts",
            active:authStatus,
        },
        {
            name:"Add Posts",
            slug:"/add-post",
            active:authStatus,
        },
    ]

    return (
        <header className='sticky top-0 z-50 backdrop-blur-md bg-white/90 dark:bg-slate-900/90 shadow-lg border-b border-gray-200/50 dark:border-gray-700'>
            <Container>
                <nav className='flex items-center py-4'>
                    <div className='mr-6'>
                        <Link 
                            to='/' 
                            className='flex items-center group transition-all duration-300 hover:scale-105'
                        >
                            <div className='relative overflow-hidden rounded-xl p-1 bg-gradient-to-r from-blue-500 to-purple-600'>
                                <div className='bg-white dark:bg-slate-900 rounded-lg p-1'>
                                    <Logo width='50px' className='transition-transform duration-300 group-hover:rotate-6'/>
                                </div>
                                <div className='absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl'></div>
                            </div>
                            <span className='ml-3 text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                                BlogApp
                            </span>
                        </Link>
                    </div>
                    {/* Dark mode toggle button styled to match project design */}
                    <button
                        onClick={() => setIsDark(!isDark)}
                        className="relative ml-2 p-0.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-md transition-all duration-300 hover:scale-105 hover:shadow-lg group"
                        aria-label="Toggle dark mode"
                    >
                        <div className="bg-white dark:bg-slate-900 rounded-full p-2 flex items-center justify-center">
                            {isDark ? (
                                <Sun size={20} className="text-yellow-400 transition-transform duration-300 group-hover:rotate-12" />
                            ) : (
                                <Moon size={20} className="text-indigo-600 transition-transform duration-300 group-hover:-rotate-12" />
                            )}
                        </div>
                    </button>
                    <ul className='flex ml-auto items-center space-x-2'>
                        {navItems.map((item)=>
                        item.active?(
                            <li key={item.name}>
                                <button
                                    onClick={()=>navigate(item.slug)}
                                    onMouseEnter={() => setHoveredItem(item.name)}
                                    onMouseLeave={() => setHoveredItem(null)}
                                    className={`
                                        relative px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-500 ease-out
                                        ${hoveredItem === item.name 
                                            ? 'text-white shadow-2xl scale-110 rotate-2 transform bg-gradient-to-r from-blue-500 to-purple-600 ring-4 ring-purple-300/30' 
                                            : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                                        }
                                        before:absolute before:inset-0 before:rounded-full 
                                        before:bg-gradient-to-r before:from-blue-500 before:to-purple-600
                                        before:opacity-0 before:transition-opacity before:duration-500
                                        ${hoveredItem === item.name ? 'before:opacity-100' : ''}
                                    `}
                                >
                                    <span className='relative z-10'>{item.name}</span>
                                </button>
                            </li>
                        ):null
                        )}
                        {authStatus && (
                            <li className='ml-4'>
                            <div className='relative p-0.5 rounded-full bg-gradient-to-r from-red-400 to-pink-500 transition-all duration-300 hover:scale-105 hover:shadow-lg group'>
                                <div className='bg-white rounded-full p-0.5'>
                                    <LogoutBtn />
                                </div>
                            </div>
                        </li>
                        )}
                    </ul>
                </nav>
            </Container>
            
            {/* Animated gradient border */}
            <div className='absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-30'></div>
        </header>
    )
}

export default Header