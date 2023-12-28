'use client'

import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/auth';

type PrivateRouteProps = { children: React.ReactNode }

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { isAuthenticated } = useAuth()
  const router = useRouter();
  
  if (!isAuthenticated) {
    router.push('/');
    return null;
  }

  return children;
};

