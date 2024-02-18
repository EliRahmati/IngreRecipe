import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Home from "./Home";
import { MemoryRouter } from 'react-router-dom';
import {AppProvider} from "./useAppContext";

describe('Home page', () => {
    it('logged out', async () => {
      render(<MemoryRouter>
          <Home/>
      </MemoryRouter>)

      //Test the header
      const homeButton = await screen.queryByText('Share and Find Recipes')
      expect(homeButton).toBeInTheDocument();

      const LoginButton = await screen.queryByText('Login')
      expect(LoginButton).toBeInTheDocument();

      const LogoutButton = await screen.queryByText('Logout')
      expect(LogoutButton).not.toBeInTheDocument();

      //Test the logged out state
      const HelloText = await screen.queryByText('Hello')
      expect(HelloText).not.toBeInTheDocument();

      const MyRecipes = await screen.queryByText('My Recipes')
        expect(MyRecipes).not.toBeInTheDocument();

      //Test the home page content
      const content = await screen.queryByText('Welcome to our innovative culinary platform, where the world of cooking is at your fingertips. At IngreRecip, we\'ve simplified the art of meal preparation by offering a user-friendly interface that allows you to input the ingredients you have on hand and instantly receive delectable recipes tailored to your available ingredients. Whether you\'re an experienced home chef or a novice in the kitchen, our platform is designed to inspire creativity and simplify your cooking journey. Say goodbye to the frustration of not knowing what to cook with the ingredients in your pantry - with IngreRecip, you\'ll embark on a delightful culinary adventure with every click. Start exploring now and let the magic of cooking come alive in your own kitchen.')
      expect(content).toBeInTheDocument();

      //Test if the search button is visible
      const search = await screen.queryByText('Search published recipes')
      expect(search).toBeInTheDocument();
    })

    it('Logged in', async () => {
      render(<AppProvider defaultUser={{username: 'Elham', token: 'testToken'}}>
          <MemoryRouter>
              <Home/>
          </MemoryRouter>
      </AppProvider>)

      //Test the header
      const homeButton = await screen.queryByText('Share and Find Recipes')
      expect(homeButton).toBeInTheDocument();

      const LoginButton = await screen.queryByText('Login')
      expect(LoginButton).not.toBeInTheDocument();

      const LogoutButton = await screen.queryByText('Logout')
      expect(LogoutButton).toBeInTheDocument();

      const HelloText = await screen.queryByText('Hello Elham')
      expect(HelloText).toBeInTheDocument();

      const MyRecipes = await screen.queryByText('My Recipes')
      expect(MyRecipes).toBeInTheDocument();

      //Test the home page content
      const content = await screen.queryByText('Welcome to our innovative culinary platform, where the world of cooking is at your fingertips. At IngreRecip, we\'ve simplified the art of meal preparation by offering a user-friendly interface that allows you to input the ingredients you have on hand and instantly receive delectable recipes tailored to your available ingredients. Whether you\'re an experienced home chef or a novice in the kitchen, our platform is designed to inspire creativity and simplify your cooking journey. Say goodbye to the frustration of not knowing what to cook with the ingredients in your pantry - with IngreRecip, you\'ll embark on a delightful culinary adventure with every click. Start exploring now and let the magic of cooking come alive in your own kitchen.')
      expect(content).toBeInTheDocument();

      //Test if the search button is visible
      const search = await screen.queryByText('Search published recipes')
      expect(search).toBeInTheDocument();

})
})
