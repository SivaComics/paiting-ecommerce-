"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

interface AuthUser {
  name: string;
  email: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  signIn: (user: AuthUser) => void;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const STORAGE_KEY = "aureline-auth";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    // Deliberate one-time sync from localStorage after mount: reading it
    // during render would cause a server/client hydration mismatch, since
    // localStorage doesn't exist during SSR.
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (stored) setUser(JSON.parse(stored));
    } catch {
      // ignore malformed/unavailable storage
    }
  }, []);

  const signIn = useCallback((nextUser: AuthUser) => {
    setUser(nextUser);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUser));
    } catch {
      // ignore unavailable storage
    }
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore unavailable storage
    }
  }, []);

  const value = useMemo(() => ({ user, signIn, signOut }), [user, signIn, signOut]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
