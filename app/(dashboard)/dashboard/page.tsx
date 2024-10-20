"use client"
import { SignOut } from '@/components/ui/Buttons/SignOutButton'
import { useSession } from 'next-auth/react'
import React from 'react'

const page = () => {
    const { data: session } = useSession()
  return (
    <div>
        {session?.user?.email}
        <SignOut />
    </div>
  )
}

export default page