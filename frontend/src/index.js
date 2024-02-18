import React, {createContext, useContext, useState} from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import Search from "./Search"
import Login from "./Login";
import Register from "./Register";
import {BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import NewRecipe from "./NewRecipe";
import Recipe from "./Recipe";
import {AppProvider} from "./useAppContext";

function App() {
   return (
       <AppProvider>
          <BrowserRouter>
             <Routes>
                 <Route exact path="/" element={<Home/>}/>
                 <Route exact path="/login" element={<Login/>}/>
                 <Route exact path="/register" element={<Register/>}/>
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
