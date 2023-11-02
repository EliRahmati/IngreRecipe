import React from 'react';
import {AppBar, Toolbar, Typography, Button, Container, Box} from '@mui/material';
import { Link } from 'react-router-dom';
import Search from "./Search";
import useAppContext from "./index";



const Home = () => {
    const {user} = useAppContext()
    const {token, username} = user
  return (
    <Box>
      <Box>
        <AppBar position="static" sx={{backgroundColor: 'saddlebrown'}}>
          <Toolbar sx={{ display: 'flex'}}>
            <Typography variant="h6" component={Link} to="/" sx={{ flexGrow:1, textDecoration: 'none', color: 'white' }}>
              Share and Find Recipes
            </Typography>
                {token && <Button component={Link} to="/my-recipes" color="primary" sx={{ textDecoration: 'none', color: 'white'}}>
                    My Recipes
                </Button>}
                <Button component={Link} to="/login" color="primary" sx={{ textDecoration: 'none', color: 'white'}}>
                      Login
               </Button>
                {!token && <Button component={Link} to="/login" color="primary" sx={{ textDecoration: 'none', color: 'white'}}>
                      Register
                </Button>}
               {token && <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: 'white' }}>
                   {`Hello ${username}`}
            </Typography>}
          </Toolbar>
        </AppBar>
      </Box>
      <Box sx={{ display: 'flex'}}>
        <Box
            component="img"
            sx={{
              flexGrow: 1,
              width: '100%'
            }}
            alt="The house from the offer."
            src="https://www.shutterstock.com/image-photo/female-hands-holding-bowl-eating-260nw-2364437979.jpg"
          />
      </Box>
      <Box>
          <Typography variant={'h6'} sx={{ flexGrow:2, textDecoration: 'none', color: 'saddlebrown', fontWeight:600, width: '99%', fontSize: 'h6.fontSize'}}>
              Welcome to our innovative culinary platform, where the world of cooking is at your fingertips.
              At IngreRecip, we've simplified the art of meal preparation by offering a user-friendly
              interface that allows you to input the ingredients you have on hand and instantly receive
              delectable recipes tailored to your available ingredients. Whether you're an experienced home
              chef or a novice in the kitchen, our platform is designed to inspire creativity and simplify your
              cooking journey. Say goodbye to the frustration of not knowing what to cook with the ingredients in
              your pantry - with IngreRecip, you'll embark on a delightful culinary adventure with every click.
              Start exploring now and let the magic of cooking come alive in your own kitchen.
          </Typography>
      </Box>
    </Box>
  );
};

export default Home;
