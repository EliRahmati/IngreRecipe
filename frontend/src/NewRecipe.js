import React, {useState, useEffect, useCallback} from 'react';
import {config} from "./Params";
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
    InputLabel, Select, MenuItem, Checkbox, FormControlLabel, Toolbar, AppBar, CircularProgress
} from '@mui/material';
import useAppContext from "./useAppContext";
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
    const [loading, setLoading] = useState(false);
    const [editing, setEditing] = useState(false);

    const handleLogoutClick = () => {
        updateUser({username: '', token: ''})
        navigate('/')
    }


    const handleRecipeClick = () => {
        setLoading(true);
        fetch(`${config.baseUrl}/me/recipes`, {
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
              setLoading(false);
              if (result.id) {
                  setError(false)
                  navigate('/my-recipes')
              }
              else {
                  setError(true)
              }
          })
          .catch((error) => {
              setLoading(false);
              setError(true)
            console.log(error);
          });
    }

    const handleEditClick = () => {
        console.log(recipe_id)
            setEditing(true);
            fetch(`${config.baseUrl}/me/recipe/${recipe_id}`, {
                method: "PUT",
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
                  setEditing(false);
                  if (result.id === recipe_id) {
                      navigate('/my-recipes')
                  } else {
                  }
              })
              .catch((error) => {
                setEditing(false);
                console.log(error);
              });
        }


    useEffect(() => {
      console.log(token)
      if (recipe_id) {
          setLoading(true);
          fetch(`${config.baseUrl}/me/recipe/${recipe_id}`, {
            method: "GET",
            headers: {'accept': 'application/json', 'Authorization': `Bearer ${token || ''}`}
        })
          .then((res) => {
              return res.json()
          })
          .then((result) => {
              setLoading(false);
              setName(result.name);
              setType(result.type);
              setShort(result.short);
              setDescription(result.description);
              setPublished(result.published)
            console.log(result);
          })
          .catch((error) => {
              setLoading(false);
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
                      {loading && <Box display={'inline-flex'}>
                            <Typography fontSize={'small'} sx={{alignSelf:'center'}}>
                                Please wait, it may take some time.
                            </Typography>
                            <CircularProgress  />
                        </Box>}
                      <Box sx={{display: "grid"}}>
                          <TextField value={name} onChange={(event) => setName(event.target.value)}
                              id="outlined-basic" label="Food Name"
                                     variant="outlined" margin={'normal'} sx={{maxWidth: 300}}/>

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
                      {id && <Button onClick={handleEditClick} variant={"outlined"} size="small">
                          {editing ? <Box display={'inline-flex'}>
                            <Typography fontSize={'small'} sx={{alignSelf:'center'}}>
                                Please wait, it may take some time.
                            </Typography>
                            <CircularProgress/>
                        </Box>: "Edit Recipe"}
                      </Button>}
                  </CardActions>
                </Card>

            </Box>
            </Box>
        );
}


export default NewRecipe
