"use client"

import Profile from '@components/Profile'
import { useSession } from '@node_modules/next-auth/react';
import { useRouter } from '@node_modules/next/navigation';
import React, { useEffect, useState } from 'react'



const MyProfile = () => {
    const { data: session } = useSession();
    const [myPosts, setPosts]=useState([])
    const router=useRouter()

    const handleEdit=({post})=>{
        router.push(`update-prompt?id=${post._id}`, 
            {method:'DELETE'}
        )

        const filteredPosts=myPosts.filter((p)=>p._id !== post._id )
        setPosts(filteredPosts)
    }
    const handleDelete=async({post})=>{
        const hasConfirmed=confirm("Are you sure you want to delete this prompt?")
        if(hasConfirmed){
            try {
               await fetch(`/api/prompt/${post._id.toString()}`) 
            } catch (error) {
                console.log(error)
            }
        }
    }

    useEffect(() => {
        const fetchPosts = async () => {
          const response = await fetch(`/api/users/${session?.user.id}/posts`);
          const data = await response.json();
    
          setPosts(data);
        };
    
        if (session?.user.id) fetchPosts();
      }, [session?.user.id]);
  return (
    <Profile name="My" desc="Welcome to your personalized profile page. Share your exceptional prompts and inspire others with the power of your imagination" data={myPosts} handleEdit={handleEdit} handleDelete={handleDelete}/>
  )
}

export default MyProfile