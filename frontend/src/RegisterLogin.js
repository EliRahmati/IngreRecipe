import React, {useState, useEffect, useCallback} from 'react';
import SchoolIcon from '@mui/icons-material/School';
import {Typography, Box, Paper, Button, TextField, Card, CardContent, CardActions} from '@mui/material';
import {display} from "@mui/system";
import useAppContext from "./index";
import {useNavigate} from "react-router-dom";

function RegisterLogin() {
    const navigate = useNavigate();
    const {updateUser} = useAppContext()
    const [username, setUsername] = useState("");
    const [fullname, setFullname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(false)
    const [loginUsername, setLoginUsername] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const handleLoginClick = () => {
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
              return res.json()
          })
          .then((result) => {
              console.log(result)
          })
          .catch((error) => {
              setError(true)
            console.log(error);
          });
    }


        return (
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
                    <Button onClick={handleRegisterClick} variant={"outlined"} size="small">Register</Button>
                  </CardActions>
                </Card>

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
                                     id="outlined-basic" label="Password"
                                     variant="outlined" margin={'normal'}
                          type="password"/>
                      </Box>
                  </CardContent>
                  <CardActions>
                    <Button onClick={handleLoginClick} variant={"outlined"} size="small">Login</Button>
                  </CardActions>
                    {error && <Typography sx={{margin: 2}} color={"red"}>
                          Invalid credential
                      </Typography>}
                </Card>

            </Box>
        );
}


export default RegisterLogin
