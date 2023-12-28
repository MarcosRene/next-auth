'use client'
import { FormEvent } from "react";

export default function SignIn() {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log('aqui')
  }

  return (
    <section className="h-screen w-screen flex justify-center items-center">
      <form className="flex flex-col w-[16rem]" onSubmit={handleSubmit} noValidate>
        <input 
          type="email" 
          name="email" 
          placeholder="E-mail" 
          className="mb-4 px-3 py-3 h-10 bg-[#fafafa] text-zinc-800 rounded text-sm"
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          className="mb-4 px-3 py-3 h-10 bg-[#fafafa] text-zinc-800 rounded text-sm"
        />

        <button type="submit" className="px-3 py-3 h-10 bg-cyan-500 rounded font-semibold text-sm transition hover:bg-cyan-600">
          Sign in
        </button>
      </form>
    </section>
  )
}
