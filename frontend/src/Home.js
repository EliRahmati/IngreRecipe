import React from 'react';
import {AppBar, Toolbar, Typography, Button, Container, Box} from '@mui/material';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component={Link} to="/" style={{ textDecoration: 'none', color: 'white' }}>
            Share and Find Recipes
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Box
            component="img"
            sx={{
              height: '100%',
              width: 800
            }}
            alt="The house from the offer."
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaMyXCCuMIBkfa-qA8CAnO3MGzWLZ_na9srGx_nO0fyu186hlMrXdwqiaOg4AhfPWFMYY&usqp=CAU"
          />
        <nav>
          <ul className="nav-links">
            <li>
              <Button component={Link} to="/login" color="primary" variant="contained">
                Login
              </Button>
            </li>
            <li>
              <Button component={Link} to="/login" color="primary" variant="contained">
                Register
              </Button>
            </li>
            <li>
              <Button component={Link} to="/recipes" color="primary" variant="contained">
                Search
              </Button>
            </li>
            <li>
              <Button component={Link} to="/my-recipes" color="primary" variant="contained">
                My Recipes
              </Button>
            </li>
          </ul>
        </nav>
      </Container>
    </div>
  );
};

export default Home;
