import React, {useState} from 'react';
import {
    Typography,
    Box,
    Button,
    TextField,
    Card,
    CardContent,
    CardActions,
    AppBar,
    Toolbar
} from '@mui/material';
import useAppContext from "./index";
import {Link, useNavigate} from "react-router-dom";

function Login() {
    const navigate = useNavigate();
    const {updateUser} = useAppContext()
    const [error, setError] = useState(false)
    const [loginUsername, setLoginUsername] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const handleLogin = () => {
        fetch("http://localhost:8000/token", {
            method: "POST",
            headers: {'accept': 'application/json', 'Content-Type': 'application/x-www-form-urlencoded'},
            body:JSON.stringify(
                `grant_type=&username=${loginUsername}&password=${loginPassword}&scope=&client_id=&client_secret=`
            )
        })
          .then((res) => {
              return res.json()
          })
          .then((result) => {
              if (result.access_token) {
                  setError(false)
                  updateUser({username: loginUsername, token: result.access_token})
                  navigate('/')
              } else {
                  setError(true)
                  updateUser({username: '', token: ''})
              }
          })
          .catch((error) => {
              setError(true)
            console.log(error);
          });
    }

    const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
        handleLogin()
    }
  };

        return (
            <Box>
                <AppBar position="static" sx={{backgroundColor: 'saddlebrown'}}>
                      <Toolbar sx={{ display: 'flex'}}>
                          <Typography variant="h6" component={Link} to="/" sx={{ flexGrow:1, textDecoration: 'none', color: 'white' }}>
                          Login in your account
                        </Typography>
                        <Button component={Link} to="/" sx={{ textDecoration: 'none', color: 'white' }}>
                          Home
                        </Button>
                      </Toolbar>
                    </AppBar>

                <Box sx={{justifyContent: 'center', display: 'flex' }}>


                <Card sx={{ minWidth: 275, width: 500, margin: 10, boxShadow: 12 }}>
                  <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      Login
                    </Typography>
                      <Box sx={{display: "grid"}}>
                          <TextField value={loginUsername} onChange={(event) => setLoginUsername(event.target.value)}
                                     id="outlined-basic" label="Username"
                                     variant="outlined" margin={'normal'}/>
                          <TextField value={loginPassword} onChange={(event) => setLoginPassword(event.target.value)}
                                     onKeyDown={handleKeyPress}
                                     id="outlined-basic" label="Password"
                                     variant="outlined" margin={'normal'}
                          type="password"/>
                      </Box>
                  </CardContent>
                  <CardActions>
                    <Button onClick={handleLogin} variant={"contained"} size="small">Login</Button>
                      <Button variant={"outlined"} component={Link} to="/register" color="primary" size="small" sx={{marginLeft: 2}}>
                      Creat New Account
                </Button>
                  </CardActions>
                    {error && <Typography sx={{margin: 2}} color={"red"}>
                          Invalid credential
                      </Typography>}
                </Card>
            </Box>
            </Box>
        );
}


export default Login
