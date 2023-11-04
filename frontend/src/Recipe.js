import React, {useState, useEffect, useCallback} from 'react';
import SchoolIcon from '@mui/icons-material/School';
import {
    Typography,
    Box,
    Paper,
    Button,
    TextField,
    Card,
    CardContent,
    CardActions,
    FormControl,
    InputLabel, Select, MenuItem, Checkbox, FormControlLabel, Toolbar, AppBar
} from '@mui/material';
import {display} from "@mui/system";
import useAppContext from "./index";
import {Link, useNavigate, useParams} from "react-router-dom";

function NewRecipe() {
    const { id } = useParams();
    const navigate = useNavigate();
    const {user, updateUser} = useAppContext()
    const {token, username} = user
    const [type, setType] = useState('');
    const [name, setName] = useState("");
    const [short, setShort] = useState("");
    const [description, setDescription] = useState("");
    const [published, setPublished] = useState(false);
    const [error, setError] = useState(false)
    const recipe_id = id?.slice(1)


    const handleLogoutClick = () => {
        updateUser({username: '', token: ''})
        navigate('/')
    }


    const handleRecipeClick = () => {
        fetch("http://localhost:8000/me/recipes", {
            method: "POST",
            headers: {'accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer ${token || ''}`},
            body:JSON.stringify(
                {name: name,
                      short: short,
                      type: type,
                      description: description,
                      published: published
                }
            )
        })
          .then((res) => {
              return res.json()
          })
          .then((result) => {
              if (result.id) {
                  setError(false)
                  navigate('/my-recipes')
              }
              else {
                  setError(true)
              }
          })
          .catch((error) => {
              setError(true)
            console.log(error);
          });
    }

    const handleEditClick = () => {
        console.log(recipe_id)
            fetch(`http://localhost:8000/recipe/${recipe_id}`, {
                method: "PUT",
                headers: {'accept': 'application/json', 'Content-Type': 'application/json'},
                body:JSON.stringify(
                    {name: name,
                          short: short,
                          type: type,
                          description: description,
                          published: published
                    }
                )
            })
              .then((res) => {
                  return res.json()
              })
              .then((result) => {
                  if (result.id === recipe_id) {
                      navigate('/my-recipes')
                  } else {
                  }
              })
              .catch((error) => {
                console.log(error);
              });
        }


    useEffect(() => {
      console.log(token)
      if (recipe_id) {
          fetch(`http://localhost:8000/recipe/${recipe_id}`, {
            method: "GET",
            headers: {'accept': 'application/json'}
        })
          .then((res) => {
              return res.json()
          })
          .then((result) => {
              setName(result.name);
              setType(result.type);
              setShort(result.short);
              setDescription(result.description);
              setPublished(result.published)
            console.log(result);
          })
          .catch((error) => {
            console.log(error);
          });
      }

  }, [id]);

        return (
            <Box>
                <AppBar position="static" sx={{backgroundColor: 'saddlebrown'}}>
                  <Toolbar sx={{ display: 'flex'}}>
                    <Typography variant="h6" component={Link} to="/" sx={{ flexGrow:1, textDecoration: 'none', color: 'white' }}>
                      Share and Find Recipes
                    </Typography>
                        {token && <Button component={Link} to="/my-recipes" color="primary" sx={{ textDecoration: 'none', color: 'white'}}>
                            My Recipes
                        </Button>}
                       {token && <Button onClick={handleLogoutClick} color="primary" sx={{ textDecoration: 'none', color: 'white'}}>
                              Logout
                       </Button>}
                       {token && <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: 'white' }}>
                           {`Hello ${username}`}
                    </Typography>}
                  </Toolbar>
                </AppBar>
                <Box sx={{justifyContent: 'center', display: 'flex' }}>
                <Card sx={{ minWidth: 500, width: 900, margin: 10, boxShadow: 12 }}>
                    <AppBar position="static" sx={{backgroundColor: 'saddlebrown'}}>
                      <Toolbar sx={{ display: 'flex'}}>
                        {!id &&<Typography variant="h6" sx={{ flexGrow:1, textDecoration: 'none', color: 'white' }}>
                          Create your Recipe
                        </Typography>}
                          {id &&<Typography variant="h6" sx={{ flexGrow:1, textDecoration: 'none', color: 'white' }}>
                          Edit your Recipe
                        </Typography>}
                      </Toolbar>
                    </AppBar>
                  <CardContent>
                      <Box sx={{display: "grid"}}>
                          <Typography>
                              {name}
                          </Typography>

                          <FormControl sx={{maxWidth: 300}}>
                              <InputLabel id="demo-simple-select-label">Type</InputLabel>
                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={type}
                                label="Type"
                                onChange={(event) => setType(event.target.value)}
                              >
                                <MenuItem value={'Breakfast'}>Breakfast</MenuItem>
                                <MenuItem value={"Lunch"}>Lunch</MenuItem>
                                <MenuItem value={"Dinner"}>Dinner</MenuItem>
                              </Select>
                            </FormControl>
                          <TextField value={short} onChange={(event) => setShort(event.target.value)}
                              id="outlined-basic" label="Short Description"
                              multiline
                              variant="outlined" margin={'normal'}/>
                          <TextField value={description} onChange={(event) => setDescription(event.target.value)}
                              id="outlined-basic" label="Full Description"
                              multiline
                              variant="outlined" margin={'normal'}/>

                          <FormControlLabel required control={<Checkbox
                              checked={published}
                              onChange={(event) => setPublished(event.target.checked)}
                          />} label="Published" />

                      </Box>
                  </CardContent>
                  <CardActions>
                      {!id && <Button onClick={handleRecipeClick} variant={"outlined"} size="small">Create Recipe</Button>}
                      {id && <Button onClick={handleEditClick} variant={"outlined"} size="small">Edit Recipe</Button>}
                  </CardActions>
                </Card>

            </Box>
            </Box>
        );
}


export default NewRecipe
