import React from 'react';
import {AppBar, Toolbar, Typography, Button, Container, Box} from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Box>
      <Box>
        <AppBar position="static" sx={{backgroundColor: 'saddlebrown'}}>
          <Toolbar sx={{ display: 'flex'}}>
            <Typography variant="h6" component={Link} to="/" sx={{ flexGrow:1, textDecoration: 'none', color: 'white' }}>
              Share and Find Recipes
            </Typography>
            <Button component={Link} to="/login" color="primary" sx={{ textDecoration: 'none', color: 'white'}}>
                  Login
           </Button>
            <Button component={Link} to="/login" color="primary" sx={{ textDecoration: 'none', color: 'white'}}>
                  Register
            </Button>
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


        <Button component={Link} to="/recipes" color="primary" variant="contained">
                Search
        </Button>
        <Button component={Link} to="/my-recipes" color="primary" variant="contained">
                My Recipes
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
