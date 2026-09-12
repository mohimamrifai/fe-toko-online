"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { getCurrentUser, loginUser, registerUser } from "@/lib/api/auth";
import {
  clearAuthSession,
  getAccessToken,
  getStoredUser,
  setAuthSession,
} from "@/lib/auth-storage";
import type { LoginPayload, PublicUser, RegisterPayload } from "@/types/auth";

interface AuthContextValue {
  user: PublicUser | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

function getInitialUser(): PublicUser | null {
  const token = getAccessToken();
  const storedUser = getStoredUser();

  if (!token || !storedUser) {
    return null;
  }

  return storedUser;
}

async function fetchCurrentUser() {
  const token = getAccessToken();

  if (!token) {
    return null;
  }

  return getCurrentUser();
}

function applyAuthUser(
  setUser: (user: PublicUser | null) => void,
  currentUser: PublicUser | null,
) {
  if (!currentUser) {
    clearAuthSession();
    setUser(null);
    return;
  }

  const token = getAccessToken();

  if (token) {
    setAuthSession(token, currentUser);
  }

  setUser(currentUser);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<PublicUser | null>(getInitialUser);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    const currentUser = await fetchCurrentUser();
    applyAuthUser(setUser, currentUser);
  }, []);

  useEffect(() => {
    void fetchCurrentUser()
      .then((currentUser) => {
        applyAuthUser(setUser, currentUser);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const login = useCallback(async (payload: LoginPayload) => {
    const response = await loginUser(payload);
    setAuthSession(response.data.accessToken, response.data.user);
    setUser(response.data.user);
  }, []);

  const register = useCallback(async (payload: RegisterPayload) => {
    const response = await registerUser(payload);
    setAuthSession(response.data.accessToken, response.data.user);
    setUser(response.data.user);
  }, []);

  const logout = useCallback(() => {
    clearAuthSession();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated: Boolean(user),
      login,
      register,
      logout,
      refreshUser,
    }),
    [user, isLoading, login, register, logout, refreshUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
