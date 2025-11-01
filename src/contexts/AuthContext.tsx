"use client";
import { EndPoint } from '@/utils/api';
import axios from "axios";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

interface AuthContextType {
    user: any;
    token: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (data: RegisterData) => Promise<void>;
    logout: () => void;
}

interface RegisterData {
    full_name: string;
    username: string;
    password: string;
    role: number;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<any>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        console.log("AuthProvider: Checking for saved token", savedToken);
        if (savedToken) {
            setToken(savedToken);
        }
    }, []);

    // Fetch user info when token changes
    useEffect(() => {
        console.log("AuthProvider: Token changed", token);
        if (token) {
            fetchUserInfo(token);
        }
    }, [token]);

    const login = async (email: string, password: string) => {
        try {
            console.log("AuthProvider: Attempting login for", email);
            const res = await axios.post(EndPoint.AUTH_LOGIN, {
                username: email,
                password,
            });
            console.log("AuthProvider: Login successful", res.data);
            localStorage.setItem("token", res.data.access);
            setToken(res.data.access);
            // User info will be fetched by the useEffect that watches token changes
        } catch (err: any) {
            console.error("AuthProvider: Login failed", err);
            throw new Error(err.response?.data?.detail || "Login failed");
        }
    };

    const fetchUserInfo = async (authToken: string) => {
        try {
            // First try the /me/ endpoint
            try {
                const res = await axios.get(EndPoint.ME, {
                    headers: {
                        Authorization: `Bearer ${authToken}`
                    }
                });
                setUser(res.data);
                return;
            } catch (meError) {
                console.log("AuthProvider: /me/ endpoint failed, trying alternative approach", meError);
            }

            // If /me/ fails, try getting user info from the token if it's a JWT
            try {
                // If the token is a JWT, we can decode it to get user info
                if (authToken.split('.').length === 3) {
                    // It's a JWT token
                    const payload = JSON.parse(atob(authToken.split('.')[1]));
                    setUser(payload);
                    return;
                }
            } catch (decodeError) {
                console.log("AuthProvider: JWT decoding failed", decodeError);
            }

            // If all else fails, set a minimal user object
            setUser({ username: "User" });
        } catch (err: any) {
            console.error("AuthProvider: Failed to fetch user info:", err);
            // If fetching user info fails, clear the token
            localStorage.removeItem("token");
            setToken(null);
        }
    };

    const register = async (data: RegisterData) => {
        try {
            const [first_name, last_name] = data.full_name.split(" ");
            const res = await axios.post(EndPoint.AUTH_SIGNUP, {
                username: data.username,
                password: data.password,
                password2: data.password,
                first_name,
                last_name,
                role: data.role,
            });
            console.log("Registered:", res.data);
        } catch (err: any) {
            throw new Error(err.response?.data?.detail || "Registration failed");
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
};