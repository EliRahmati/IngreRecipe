import React, {createContext, useContext, useState} from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import Search from "./Search"
import RegisterLogin from "./RegisterLogin";
import {BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import NewRecipe from "./NewRecipe";
import Recipe from "./Recipe";



const AppContext = createContext();
const AppProvider = ({ children }) => {
  const [user, setUser] = useState({username: localStorage.getItem('username'), token: localStorage.getItem('token')});

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
                 <Route exact path="/recipe/:id" element={<Recipe/>}/>
             </Routes>
          </BrowserRouter>
       </AppProvider>
   );
}


const Element= <App></App>
const root=ReactDOM.createRoot(document.getElementById("root"));
root.render(Element)
    
reportWebVitals();
