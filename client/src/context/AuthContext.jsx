import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 👈 import this

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const navigate = useNavigate(); // 👈 use navigate

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            // You could decode/validate the token here
            // setUser(decodedUser);
        }
    }, []);

    const login = (userData, token) => {
        setUser(userData);
        localStorage.setItem('token', token);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        navigate('/login'); // 👈 redirect to login after logout
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}
