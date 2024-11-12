import { jwtDecode } from 'jwt-decode';
import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const isTokenExpired = (token) => {
    if (!token) return true; // Se não houver token, consideramos como expirado
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Tempo atual em segundos
    return decoded.exp < currentTime; // Verifica se o token está expirado
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !isTokenExpired(token)) {
      const decoded = jwtDecode(token);
      console.log('Decoded token:', decoded);
      setUser(decoded.usuario);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    const decoded = jwtDecode(token);
    setUser(decoded.usuario);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
