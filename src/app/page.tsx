'use client'
import { ChangeEvent, FormEvent, useState } from "react";

import { useAuth } from '@/contexts/auth'

export default function SignIn() {
  const {  signIn } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const payload = { email, password }

    await signIn(payload);
  }

  return (
    <section className="h-screen w-screen flex justify-center items-center">
      <form className="flex flex-col w-[16rem]" onSubmit={handleSubmit} noValidate>
        <input 
          type="email" 
          name="email" 
          placeholder="E-mail" 
          value={email}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)}
          className="mb-4 px-3 py-3 h-10 bg-[#fafafa] text-zinc-800 rounded text-sm"
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password"
          value={password}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)} 
          className="mb-4 px-3 py-3 h-10 bg-[#fafafa] text-zinc-800 rounded text-sm"
        />

        <button type="submit" className="px-3 py-3 h-10 bg-cyan-500 rounded font-semibold text-sm transition hover:bg-cyan-600">
          Sign in
        </button>
      </form>
    </section>
  )
}
