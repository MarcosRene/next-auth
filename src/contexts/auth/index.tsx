'use client'

import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner'
import { setCookie, parseCookies, destroyCookie } from 'nookies'

import { api } from '@/services/api';

type User = {
  email: string;
  permissions: string[];
  roles: string[];
}

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  signIn(credentails: SignInCredentials): Promise<void>;
  isAuthenticated: boolean;
  user: User;
};

type AuthProviderProps = {
  children: ReactNode
}

const AuthContext = createContext({} as AuthContextData);

const initialUserState: User = {
  email: '',
  permissions: [],
  roles: []
}

export enum COOKIES_KEY {
  token = '@token',
  refreshToken = '@refreshToken'
} 

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>(initialUserState)
  const router = useRouter()
  
  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'nextauth@token': token } = parseCookies()

    if (token) {
      api.get('/me')
        .then((response) => {
          const { email, permissions, roles } = response.data;

          setUser({ email, permissions, roles })
        })
        .catch(() => {
          destroyCookie(undefined, `nextauth${COOKIES_KEY.token}`);
          destroyCookie(undefined, `nextauth${COOKIES_KEY.refreshToken}`);

          router.push('/')
        })
    }
  }, [])

  const signIn = useCallback(async ({ email, password }: SignInCredentials) => {
    try {
      const response = await api.post('/sessions', {
        email, 
        password
      })

      const { token, refreshToken, permissions, roles } = response.data

      setCookie(undefined, `nextauth${COOKIES_KEY.token}`, token, {
        maxAge: 60 * 60 * 24 * 30, // days
        path: '/'
      })

      setCookie(undefined, `nextauth${COOKIES_KEY.refreshToken}`, refreshToken, {
        maxAge: 60 * 60 * 24 * 30, // days
        path: '/'
      })

      setUser({
        email,
        permissions, 
        roles
      })

      api.defaults.headers['Authorization'] = `Bearer ${token}`

      router.push('/dashboard')
    } catch (error) {
      toast.error('Incorrect email or password')
    }
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated, user }}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      'useAuth must be used within an AuthProvider'
    );
  }

  return context;
}