import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import SchoolIcon from '@mui/icons-material/School';
import {Typography, Box, Paper, Collapse, Button, TextField, Card, CardContent, CardActions, Grid} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

function App() {
  const [recipes, setRecipes] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    fetch("http://127.0.0.1:8000/recipes")
      .then((res) => {
          return res.json()
      })
      .then((result) => {
        setRecipes(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

        return (
            <div>
                <Paper variant="outlined" style={{ background: "lightgray" }}>
                    <Box display={'flex'}>
                        <SchoolIcon style={{fontSize: '3em', marginRight: 25}}/>
                        <Typography variant="h3" component="h3">
                            List of Recipes
                        </Typography>
                    </Box>
                </Paper>
                <Paper variant="outlined">
                    <Box display={'flex'}>
                        <TextField onChange={(event) => {
                            setSearchInput(event.target.value)
                        }} value={searchInput} label="Search" variant="outlined" style={{width: 500, margin: 5}} />
                        <Button variant="contained" style={{margin: 5}}>Previous page</Button>
                        <Button variant="contained" style={{margin: 5}}>Next page</Button>
                    </Box>
                </Paper>
                {recipes.filter(uni => uni.name.toLowerCase().startsWith(searchInput)).map((row, index) => (
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Card sx={{ width: "50%", margin: 1}}>
                                <CardContent>
                                    <Box sx={{ display: 'flex'}}>
                                        <Box width={"35%"}>
                                            <Typography variant="h5" component="div">
                                                {row.name}
                                            </Typography>
                                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                {row.type}
                                            </Typography>
                                        </Box>
                                        <Box width={"65%"}>
                                            <Card sx={{backgroundColor: 'lightgray'}}>
                                                <CardContent>
                                                <Typography variant="body2">
                                                    {row.short}
                                                </Typography>
                                                    </CardContent>
                                            </Card>
                                        </Box>
                                    </Box>
                                </CardContent>
                                <CardActions>
                                    <Button size="small">See Recipe</Button>
                                </CardActions>
                            </Card>
                        </Box>
                        ))}
            </div>
        );
}


const Element= <App></App>
const root=ReactDOM.createRoot(document.getElementById("root"));
root.render(Element)
    
reportWebVitals();
