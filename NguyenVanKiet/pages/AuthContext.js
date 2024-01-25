// AuthContext.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const register = (email, password) => {
    // Xử lý logic đăng ký ở đây và cập nhật trạng thái của user
    setUser({ email, password });
  };

  const login = (email, password) => {
    if (user && user.email === email && user.password === password) {
      // Xử lý logic đăng nhập thành công ở đây
      return true;
    } else {
      // Xử lý logic đăng nhập thất bại ở đây
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ user, register, login }}>
      {children}
    </AuthContext.Provider>
  );
};
