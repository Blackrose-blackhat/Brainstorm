"use client"
import React from 'react'
import { signIn } from "next-auth/react"

const AuthButton = () => {
  return (
    <button onClick={() => signIn("google")}>Sign in with </button>
  )
}

export default AuthButton