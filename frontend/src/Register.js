import React, {useState, useEffect, useCallback} from 'react';
import SchoolIcon from '@mui/icons-material/School';
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

function Register() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState(false)

    const handleRegisterClick = () => {
        fetch("http://localhost:8000/users", {
            method: "POST",
            headers: {'accept': 'application/json', 'Content-Type': 'application/json'},
            body:JSON.stringify(
                {username: username,
                      full_name: fullname,
                      email: email,
                      password: password}
            )
        })
          .then((res) => {
              if (res.status === 200) {
                  setError(false)
                  navigate('/login')
              }
              else {
                  setError(true)
              }
          })
          .catch((error) => {
              setError(true)
          });
    }


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
                      Register
                    </Typography>
                      <Box sx={{display: "grid"}}>
                          <TextField value={username} onChange={(event) => setUsername(event.target.value)}
                              id="outlined-basic" label="Username"
                                     variant="outlined" margin={'normal'}/>
                          <TextField value={fullname} onChange={(event) => setFullname(event.target.value)}
                              id="outlined-basic" label="fullname"
                                     variant="outlined" margin={'normal'}/>
                          <TextField value={email} onChange={(event) => setEmail(event.target.value)}
                              id="outlined-basic" label="email"
                                     variant="outlined" margin={'normal'}/>
                          <TextField value={password} onChange={(event) => setPassword(event.target.value)}
                              id="outlined-basic" label="Password"
                              variant="outlined" margin={'normal'} type="password"/>
                          <TextField color={password !== confirmPassword ? 'error' : 'primary'} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)}
                              id="outlined-basic" label="Confirm Password"
                              variant="outlined" margin={'normal'} type="password"/>
                      </Box>
                  </CardContent>
                  <CardActions>
                    <Button disabled={password !== confirmPassword || !username || !fullname || !email} onClick={handleRegisterClick} variant={"outlined"} size="small">Register</Button>
                  </CardActions>
                    {error && <Typography sx={{margin: 2}} color={"red"}>
                          Something went wrong!
                      </Typography>}
                </Card>
            </Box>
            </Box>
        );
}


export default Register
