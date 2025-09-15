import React, { createContext, useEffect, useState } from 'react';
import AuthService from '../ApiService/AuthService';
import UserService from '../ApiService/UserService';
import { useMutation, useQuery } from 'react-query';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [savePlan, setSavePlan] = useState(null);
    const [isCreatePlan, setIsCreatePlan] = useState(true);

    useEffect(() => {
        if (!token) {
            const accessToken = localStorage.getItem('token');
            if (accessToken) {
                setToken(accessToken);
            } else {
                setIsLoading(false);
            }
        }
    }, [token]);

    const { data: currentUserData, isLoading: userLoading } = useQuery({
        queryKey: ['getUser'],
        queryFn: UserService.getUser,
        enabled: !!token,
        retry: 3,
        onSuccess: ({ data }) => {
            console.log('CURRENT USER', data);
            setUser(data);
        },
        onSettled: () => {
            setIsLoading(false);
        },
    });

    const { mutateAsync: deleteToken } = useMutation(AuthService.logout);

    const logout = async () => {
        await deleteToken().finally(() => {
            localStorage.removeItem('token');
            setToken(null);
            setUser(null);
        });
    };

    const saveToken = (token) => {
        setToken(token);
        localStorage.setItem('token', token);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                saveToken,
                logout,
                token,
                isLoading,
                setIsLoading,
                savePlan,
                setSavePlan,
                isCreatePlan,
                setIsCreatePlan,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
