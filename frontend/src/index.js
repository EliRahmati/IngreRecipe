import React, {createContext, useContext, useState} from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import Search from "./Search"
import RegisterLogin from "./RegisterLogin";
import {BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import NewRecipe from "./NewRecipe";



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
          <BrowserRouter>
             <Routes>
                 <Route exact path="/" element={<Home/>}/>
                 <Route exact path="/login" element={<RegisterLogin/>}/>
                 <Route exact path="/recipes" element={<Search published={true}/>}/>
                 <Route exact path="/my-recipes" element={<Search published={false}/>}/>
                 <Route exact path="/new-recipe" element={<NewRecipe/>}/>
                 <Route exact path="/edit-recipe/:id" element={<NewRecipe/>}/>
             </Routes>
          </BrowserRouter>
       </AppProvider>
   );
}


const Element= <App></App>
const root=ReactDOM.createRoot(document.getElementById("root"));
root.render(Element)
    
reportWebVitals();
