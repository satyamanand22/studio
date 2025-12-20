"use client";

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import type { User } from './types';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, pass: string) => Promise<void>;
  signUp: (name: string, email: string, pass: string, role: 'student' | 'admin') => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('campus-pulse-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, pass: string) => {
    setLoading(true);
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    const mockUser: User = {
      uid: 'mock-uid-123',
      email,
      displayName: 'Mock User',
      photoURL: 'https://i.pravatar.cc/150?u=mock-user',
      role: 'student',
    };
    localStorage.setItem('campus-pulse-user', JSON.stringify(mockUser));
    setUser(mockUser);
    setLoading(false);
  };

  const signUp = async (name: string, email: string, pass: string, role: 'student' | 'admin') => {
    setLoading(true);
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    const mockUser: User = {
      uid: `mock-uid-${Math.random()}`,
      email,
      displayName: name,
      photoURL: `https://i.pravatar.cc/150?u=${email}`,
      role,
    };
    localStorage.setItem('campus-pulse-user', JSON.stringify(mockUser));
    setUser(mockUser);
    setLoading(false);
  };

  const signInWithGoogle = async () => {
    setLoading(true);
    // Mock API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    const mockUser: User = {
      uid: 'mock-uid-google-456',
      email: 'mock.google.user@example.com',
      displayName: 'Google User',
      photoURL: `https://i.pravatar.cc/150?u=google-user`,
      role: 'student',
    };
    localStorage.setItem('campus-pulse-user', JSON.stringify(mockUser));
    setUser(mockUser);
    setLoading(false);
  };

  const signOut = async () => {
    setLoading(true);
    localStorage.removeItem('campus-pulse-user');
    setUser(null);
    setLoading(false);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signInWithGoogle, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};
