import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { api, createSession, registerAccount } from "../services/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [exist, setExist] = useState(false);

    useEffect(() => {
        const recoveredUser = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if(recoveredUser && token){
            setUser(JSON.parse(recoveredUser));
            api.defaults.headers.Authorization = `Bearer ${token}`;
        }

        setLoading(false);
    }, []);

    const login = async (userData) => {
        const response = await createSession(userData.username, userData.password);

        if(response.status === 401 || response.status === 404){
            console.log('Usuário ou Senha incorretos!!');
        }
        else if(response.status === 500){
            console.log('Ocorreu um erro interno do servidor!');
        }
        else {
            const loggedUser = response.data.user;
            const token = response.data.token;
            
            console.log(loggedUser);
            console.log(token);
            // localStorage.setItem('user', JSON.stringify(loggedUser));
            // localStorage.setItem('token', JSON.stringify(token));
    
            // api.defaults.headers.Authorization = `Bearer ${token}`;
    
            // setUser(loggedUser);
            // navigate('/');
        }
    }

    const logout = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('token');

        api.defaults.headers.Authorization = null;

        setUser(null);
        navigate('/login');
    }

    const signup = async (userData) => {
        const response = await registerAccount(userData.username, userData.password);

        console.log(response);
        if(response.status === 200){
            console.log('Usuário já existe');
            setExist(true);
        }
        else if(response.status === 201){
            console.log('Usuário criado');
            setExist(false);
            navigate('/');
        }
    }

    return(
        <AuthContext.Provider
            value={{ authenticated: !!user, user, loading, exist, login, logout, signup, setExist }}
        >
            {children}
        </AuthContext.Provider>
    )
}