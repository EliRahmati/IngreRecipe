import React, { useState, useEffect } from 'react';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import {
    Typography,
    Box,
    Paper,
    Button,
    TextField,
    Card,
    CardContent,
    CardActions,
    Toolbar,
    AppBar, CircularProgress
} from '@mui/material';
import useAppContext from "./index";
import {Link, useNavigate} from "react-router-dom";
import {config} from "./Params";

function Search({published}) {
    const navigate = useNavigate();
    const {user, updateUser} = useAppContext()
    const {token, username} = user
    const [recipes, setRecipes] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [refresh, setRefresh] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleLogoutClick = () => {
        updateUser({username: '', token: ''})
        navigate('/')
    }

    const handleDeleteClick = (id) => {
            fetch(`${config.baseUrl}/me/recipe/${id}`, {
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
      setLoading(true);
      if (published) {
          fetch(`${config.baseUrl}/recipes`)
          .then((res) => {
              return res.json()
          })
          .then((result) => {
              setLoading(false);
            setRecipes(result);
          })
          .catch((error) => {
              setLoading(false);
            console.log(error);
          });
      } else {
          fetch(`${config.baseUrl}/me/recipes`, {
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
              setLoading(false);
              setRecipes(result)
          })
          .catch((error) => {
              setLoading(false);
            console.log(error);
          });
      }

  }, [searchInput, refresh]);

        return (
            <div>
                <AppBar position="static" sx={{backgroundColor: 'saddlebrown'}}>
                  <Toolbar sx={{ display: 'flex'}}>
                      <RestaurantIcon style={{fontSize: '3em', marginRight: 25, textDecoration: 'none', color: 'white'}}/>
                    <Typography variant="h6" component={Link} to="/" sx={{ flexGrow:1, textDecoration: 'none', color: 'white' }}>
                      Share and Find Recipes
                    </Typography>
                      <Button component={Link} to="/" color="primary"  sx={{margin: 2, textDecoration: 'none', color: 'white'}}>
                            Home
                        </Button>
                        {!token && <Button component={Link} to="/login" color="primary" sx={{ textDecoration: 'none', color: 'white'}}>
                              Login
                       </Button>}
                       {token && <Button onClick={handleLogoutClick} color="primary" sx={{ textDecoration: 'none', color: 'white'}}>
                              Logout
                       </Button>}
                        {!token && <Button component={Link} to="/login" color="primary" sx={{ textDecoration: 'none', color: 'white'}}>
                              Register
                        </Button>}
                       {token && <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: 'white' }}>
                           {`Hello ${username}`}
                    </Typography>}
                  </Toolbar>
                </AppBar>
                <Paper variant="outlined">
                    <Box display={'flex'}>
                        <TextField onChange={(event) => {
                            setSearchInput(event.target.value)
                        }} value={searchInput} label="Search" variant="outlined" style={{width: 500, margin: 5}} />
                        {!published && <Button variant={'contained'} component={Link} to="/new-recipe" sx={{margin: 2 ,textDecoration: 'none',
                            color: 'white', backgroundColor: 'saddlebrown'}}>
                            Create New Recipe
                        </Button>}
                    </Box>
                </Paper>
                {loading && <Box display={'inline-flex'}>
                            <Typography fontSize={'small'} sx={{alignSelf:'center'}}>
                                Please wait, it may take some time.
                            </Typography>
                            <CircularProgress  />
                        </Box>}
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
                                    <Button component={Link} to={`/recipe/:${row.id}`} color="primary">
                                        See Recipe
                                    </Button>
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
