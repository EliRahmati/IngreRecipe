import React, { useState, useEffect } from 'react';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import {Typography, Box, Paper, Button, TextField, Card, CardContent, CardActions} from '@mui/material';
import useAppContext from "./index";
import {Link} from "react-router-dom";

function Search({published}) {
    const {user} = useAppContext()
    const {token} = user
    const [recipes, setRecipes] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [refresh, setRefresh] = useState(false);
    const [type, setType] = useState('');
    const [name, setName] = useState("");
    const [short, setShort] = useState("");
    const [description, setDescription] = useState("");

    console.log(token)
    const handleDeleteClick = (id) => {
            fetch(`http://localhost:8000/me/recipe/${id}`, {
                method: "DELETE",
                headers: {'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${token || ''}`}
            })
              .then((res) => {
                  return res.json()
              })
              .then((result) => {
                  if (result.message === "Item deleted") {
                                        console.log(result)
                     setRefresh(value => !value);
                  } else {

                  }
              })
              .catch((error) => {
                console.log(error);
              });
        }


  useEffect(() => {
      console.log(token)
      if (published) {
          fetch("http://localhost:8000/recipes")
          .then((res) => {
              return res.json()
          })
          .then((result) => {
            setRecipes(result);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
          fetch("http://localhost:8000/me/recipes", {
            method: "GET",
            headers: {'accept': 'application/json', 'Authorization': `Bearer ${token || ''}`}
        })
          .then((res) => {
              if (res.status === 200)
                return res.json()
              else
                  return []
          })
          .then((result) => {
              setRecipes(result)
          })
          .catch((error) => {
            console.log(error);
          });
      }

  }, [searchInput, refresh]);

        return (
            <div>
                <Paper variant="outlined" style={{ background: "lightgray" }}>
                    <Box display={'flex'}>
                        <RestaurantIcon style={{fontSize: '3em', marginRight: 25}}/>
                        <Typography variant="h3" component="h3">
                            List of Recipes
                        </Typography>
                        <Button component={Link} to="/new-recipe" color="primary" variant="contained" sx={{margin: 2}}>
                            Create New Recipe
                        </Button>
                        <Button component={Link} to="/" color="primary" variant="contained" sx={{margin: 2}}>
                            Home
                        </Button>
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
                                    {!published && <Button onClick={(event) => handleDeleteClick(row.id)} size="small">Delete</Button>}
                                    {!published && <Button component={Link} to={`/edit-recipe/:${row.id}`} color="primary">
                                        Edit
                                    </Button>}
                                </CardActions>
                            </Card>
                        </Box>
                        ))}
            </div>
        );
}


export default Search
