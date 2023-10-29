import React, {useState, useEffect, useCallback} from 'react';
import SchoolIcon from '@mui/icons-material/School';
import {Typography, Box, Paper, Button, TextField, Card, CardContent, CardActions} from '@mui/material';
import {display} from "@mui/system";
import useAppContext from "./index";

function RegisterLogin() {
    const {updateToken} = useAppContext()
    const[username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false)

    const requestOptions = {
        method: "POST",
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body:JSON.stringify(
            `grant_type=&username=${username}&password=${password}&scope=&client_id=&client_secret=`
        )
    };
    const handleLoginClick = () => {
        fetch("http://localhost:8000/token", requestOptions)
          .then((res) => {
              return res.json()
          })
          .then((result) => {
              if (result.access_token) {
                  setError(false)
              } else {
                  setError(true)
              }
              updateToken(result.access_token)
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
                          <TextField id="outlined-basic" label="Username" variant="outlined" margin={'normal'}/>
                          <TextField id="outlined-basic" label="Password" variant="outlined" margin={'normal'} type="password"/>
                          <TextField id="outlined-basic" label="Confirm Password" variant="outlined" margin={'normal'} type="password"/>
                      </Box>
                  </CardContent>
                  <CardActions>
                    <Button variant={"outlined"} size="small">Register</Button>
                  </CardActions>
                </Card>

                <Card sx={{ minWidth: 275, width: 500, margin: 10, boxShadow: 12 }}>
                  <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      Login
                    </Typography>
                      <Box sx={{display: "grid"}}>
                          <TextField value={username} onChange={(event) => setUsername(event.target.value)} id="outlined-basic" label="Username" variant="outlined" margin={'normal'}/>
                          <TextField value={password} onChange={(event) => setPassword(event.target.value)} id="outlined-basic" label="Password" variant="outlined" margin={'normal'}
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
