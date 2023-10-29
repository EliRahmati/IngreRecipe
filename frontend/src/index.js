import React, {createContext, useContext, useState} from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import Search from "./Search"
import RegisterLogin from "./RegisterLogin";
import {Box} from "@mui/material";


const AppContext = createContext();
const AppProvider = ({ children }) => {
  const [token, setToken] = useState('Initial Value');

  const updateToken = (newValue) => {
    setToken(newValue);
  };

  return (
    <AppContext.Provider value={{ token, updateToken }}>
      {children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext);
};

export default useAppContext;



function App() {
   return (
       <AppProvider>
          <Box>
             <RegisterLogin></RegisterLogin>
             <Search></Search>
          </Box>
       </AppProvider>
   );
}


const Element= <App></App>
const root=ReactDOM.createRoot(document.getElementById("root"));
root.render(Element)
    
reportWebVitals();
