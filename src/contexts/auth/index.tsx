"use client"

import { ReactNode, createContext, useContext } from 'react';
import { toast } from 'sonner'

import { api } from '@/services/api';

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  signIn(credentails: SignInCredentials): Promise<void>;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: ReactNode
}

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('/sessions', {
        email, 
        password
      })
  
      console.log(response.data)
    } catch (error) {
      toast.error('Incorrect email or password')
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated: false }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used within an AuthProvider"
    );
  }

  return context;
}