import React, {useEffect, useState} from 'react'
import appwriteService from "../appwrite/config";
import {Container, PostCard} from '../components'
import { useSelector } from 'react-redux';

function Home() {
    const [posts, setPosts] = useState([])
    const authStatus=useSelector((state)=>state.auth.status)

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, [])
  
    if (posts.length === 0) {
        return (
            <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-12 px-4">
                <Container>
                    <div className="flex flex-wrap items-center justify-center">
                        <div className="p-6 w-full max-w-lg mx-auto bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-gray-200/60 dark:border-gray-700 text-center">
                            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">Welcome to BlogApp</h1>
                            {!authStatus ? (
                                <h2 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">Login to Read Posts</h2>
                            ) : (
                                <h2 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">No posts available yet.</h2>
                            )}
                            <p className="text-gray-500 dark:text-gray-400">Start sharing your stories or check back later for new content!</p>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 py-12 px-4">
            <Container>
                <div className="flex flex-wrap gap-6 justify-center">
                    {posts.map((post) => (
                        <div key={post.$id} className="p-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                            <div className="h-full">
                                <PostCard {...post} />
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home
