import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import SchoolIcon from '@mui/icons-material/School';
import {Typography, Box, Paper, Collapse, Button, TextField} from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';
import ButtonBase from '@mui/material/ButtonBase';
import Link from '@mui/material/Link';
function EmployeeComponent() {
  const [universities, setUniversities] = useState([]);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    fetch("http://127.0.0.1:8000/recipes")
      .then((res) => {
          return res.json()
      })
      .then((result) => {
        setUniversities(result);
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
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Food Name</TableCell>
                            <TableCell align="left">Short Description</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {universities.filter(uni => uni.name.toLowerCase().startsWith(searchInput)).map((row, index) => (
                            <TableRow
                            key={row.name}
                            onClick={() => {}}
                            style={{backgroundColor: "white"}}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="left">
                                    {row.short}
                                </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    </TableContainer>
            </div>
        );
}


const Element= <EmployeeComponent></EmployeeComponent>
const root=ReactDOM.createRoot(document.getElementById("root"));
root.render(Element)
    
reportWebVitals();
