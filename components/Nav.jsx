"use client"

import Image from "next/image"
import { useState, useEffect } from 'react'
import Link from "next/link";
import { signIn, signOut, useSession, getProviders } from "next-auth/react"

const Nav = () => {
    const { data: session }=useSession()
    const [providers, setProviders]=useState(null);
    const [toggleDropDown, setToggleDropDown]=useState(false)
    useEffect(()=>{
        const setUpProviders=async () =>{
            const response=await getProviders();
            setProviders(response)
            console.log(response)
        }
        setUpProviders()
    },[])
  return (
    <nav className='flex-between w-full mb-16 pt-3'>
        <Link className='flex gap-2 flex-center' href="/">
        <Image src="/assets/images/logo.svg" alt="Promptopia logo" width={30} height={30} className='object-contain'/>
        <p className='logo_text'>Promptopia</p>
        </Link>
        

        {/* desktop navigation */}
        <div className='sm:flex hidden'>
            {session?.user ? (
            <div className='flex gap-3 md:gap-5'>
                <Link href="/create-prompt" className='capitalize black_btn'>create post</Link>
                <button type='button' onClick={signOut} className='outline_btn'>Sign Out</button>
                <Link href="/profile">
                <Image src={session?.user.image}width={37} height={37} className='rounded-full' alt='profile'/>
                </Link>
            </div>
            ):(
                <>
                {providers && Object.values(providers).map((provider)=>(
                    <button type='button' key={provider.name} onClick={()=>signIn(provider.id)} className='black_btn'>Sign In</button>
                ))}
                </>
            )}
        </div>


        {/* mobile navigation */}
        <div className='sm:hidden flex relative'>
            {session?.user?(
                <div className='flex'>
                   <Image src={session?.user.image} width={37} height={37} className='rounded-full' alt='profile' onClick={()=>setToggleDropDown((prev)=>!prev)}/> 
                    {toggleDropDown && (
                        <div className='dropdown'>
                            <Link href="/profile" className='dropdown_link' onClick={()=>setToggleDropDown(false)}>My Profile</Link>
                            <Link href="/profile" className='dropdown_link' onClick={()=>setToggleDropDown(false)}>Create Prompt</Link>
                            <button type='button' onClick={()=>{
                                setToggleDropDown(false);
                                signOut()
                            }} className='mt-5 w-full black_btn'> Sign Out</button>
                        </div>
                    )}
                </div>
            ):(
                <>
                {providers && Object.values(providers).map((provider)=>(
                    <button key={provider.name} type='button' onClick={()=>signIn(provider.id)} className='black_btn'>Sign In</button>
                ))}
                </>
            )}
        </div>
    </nav>
  )
}

export default Nav

