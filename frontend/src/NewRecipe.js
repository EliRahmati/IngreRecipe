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
    InputLabel, Select, MenuItem, Checkbox, FormControlLabel
} from '@mui/material';
import {display} from "@mui/system";
import useAppContext from "./index";
import {Link, useNavigate, useParams} from "react-router-dom";

function NewRecipe() {
    const { id } = useParams();
    const navigate = useNavigate();
    const {token} = useAppContext()
    const [type, setType] = useState('');
    const [name, setName] = useState("");
    const [short, setShort] = useState("");
    const [description, setDescription] = useState("");
    const [published, setPublished] = useState(false);
    const [error, setError] = useState(false)
    const recipe_id = id.slice(1)

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
            fetch(`http://localhost:8000/me/recipe/${recipe_id}`, {
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
          fetch(`http://localhost:8000/me/recipe/${recipe_id}`, {
            method: "GET",
            headers: {'accept': 'application/json', 'Authorization': `Bearer ${token || ''}`}
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
            <Box sx={{justifyContent: 'center', display: 'flex' }}>

                <Card sx={{ minWidth: 275, width: 500, margin: 10, boxShadow: 12 }}>
                  <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                      New Recipe
                    </Typography>
                      <Box sx={{display: "grid"}}>
                          <TextField value={name} onChange={(event) => setName(event.target.value)}
                              id="outlined-basic" label="Food Name"
                                     variant="outlined" margin={'normal'}/>

                          <FormControl fullWidth>
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
                              multiline maxRows={4}
                              variant="outlined" margin={'normal'} sx={{height: 100}}/>
                          <TextField value={description} onChange={(event) => setDescription(event.target.value)}
                              id="outlined-basic" label="Full Description"
                              multiline maxRows={20}
                              variant="outlined" margin={'normal'} sx={{height: 100}}/>

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
        );
}


export default NewRecipe