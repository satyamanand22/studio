
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
  verifyAndLogin: (email: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

const USERS_DB_KEY = 'campus-pulse-users-db';
const LOGGED_IN_USER_KEY = 'campus-pulse-user';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem(LOGGED_IN_USER_KEY);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const signIn = async (email: string, pass: string) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const usersStr = localStorage.getItem(USERS_DB_KEY);
    const users = usersStr ? JSON.parse(usersStr) : [];
    
    const foundUser = users.find((u: any) => u.email === email && u.password === pass);

    setLoading(false);
    if (foundUser) {
      if (!foundUser.isVerified) {
        throw new Error('Account not verified. Please check your email for the OTP.');
      }
      localStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(foundUser));
      setUser(foundUser);
    } else {
      throw new Error('Invalid email or password. Please sign up if you do not have an account.');
    }
  };

  const signUp = async (name: string, email: string, pass: string, role: 'student' | 'admin') => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const usersStr = localStorage.getItem(USERS_DB_KEY);
    const users = usersStr ? JSON.parse(usersStr) : [];

    if (users.some((u: any) => u.email === email)) {
      setLoading(false);
      throw new Error('An account with this email already exists.');
    }

    const newUser: User & { password?: string; isVerified?: boolean; } = {
      uid: `mock-uid-${Math.random()}`,
      email,
      displayName: name,
      photoURL: `https://i.pravatar.cc/150?u=${email}`,
      role,
      password: pass,
      isVerified: false,
    };
    
    users.push(newUser);
    localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));
    
    setLoading(false);
    // Don't log in, redirect to OTP page
    router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
  };

  const verifyAndLogin = async (email: string) => {
    const usersStr = localStorage.getItem(USERS_DB_KEY);
    const users = usersStr ? JSON.parse(usersStr) : [];
    
    let foundUser: (User & { password?: string; isVerified?: boolean; }) | undefined;
    const updatedUsers = users.map((u: any) => {
      if (u.email === email) {
        foundUser = { ...u, isVerified: true };
        return foundUser;
      }
      return u;
    });

    if (foundUser) {
      localStorage.setItem(USERS_DB_KEY, JSON.stringify(updatedUsers));
      const { password, ...userToStore } = foundUser;
      localStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(userToStore));
      setUser(userToStore);
    } else {
      throw new Error("User not found during verification.");
    }
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
    localStorage.setItem(LOGGED_IN_USER_KEY, JSON.stringify(mockUser));
    setUser(mockUser);
    setLoading(false);
  };

  const signOut = async () => {
    setLoading(true);
    localStorage.removeItem(LOGGED_IN_USER_KEY);
    setUser(null);
    setLoading(false);
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signInWithGoogle, signOut, verifyAndLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
