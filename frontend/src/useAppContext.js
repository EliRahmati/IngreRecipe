import React, {createContext, useContext, useState} from "react";

export const AppContext = createContext();
export const AppProvider = ({ defaultUser, children }) => {
  const [user, setUser] = useState({username: defaultUser?.username || localStorage.getItem('username'), token: defaultUser?.token || localStorage.getItem('token')});

  const updateUser = (newValue) => {
      localStorage.setItem('token', newValue.token)
      localStorage.setItem('username', newValue.username)
    setUser(newValue);
  };

  return (
      <AppContext.Provider value={{ user, updateUser }}>
          {children}
      </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export default useAppContext;