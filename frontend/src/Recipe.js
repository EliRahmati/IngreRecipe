import React, {useState, useEffect, useCallback} from 'react';
import {config} from "./Params";
import {
    Typography,
    Box,
    Button,
    Toolbar, AppBar
} from '@mui/material';
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

    useEffect(() => {
      if (recipe_id) {
          if (token) {
              fetch(`${config.baseUrl}/me/recipe/${recipe_id}`, {
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
          } else {
              fetch(`${config.baseUrl}/recipe/${recipe_id}`, {
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
      }

  }, [id]);

    if (!token && !published) {
        return <Box>
            <AppBar position="static" sx={{backgroundColor: 'saddlebrown'}}>
              <Toolbar sx={{ display: 'flex'}}>
                <Typography variant="h6" sx={{ flexGrow:1, textDecoration: 'none', color: 'white' }}>
                  Published Recipes
                </Typography>
                <Button component={Link} to="/" sx={{ textDecoration: 'none', color: 'white' }}>
                  Home
                </Button>
                {token && <Typography variant="h6" component={Link} to="/" sx={{ textDecoration: 'none', color: 'white' }}>
                   {`Hello ${username}`}
                </Typography>}
              </Toolbar>
            </AppBar>
            <Box display={'flex'} justifyContent={'center'} margin={20}>
                <Typography variant={'h3'} color={'error'}>
                    You do not have access to this recipe!
                </Typography>
            </Box>
        </Box>
    }
        return (
            <Box>
                <AppBar position="static" sx={{backgroundColor: 'saddlebrown'}}>
                  <Toolbar sx={{ display: 'flex'}}>
                    <Typography variant="h6" sx={{ flexGrow:1, textDecoration: 'none', color: 'white' }}>
                      Published Recipes
                    </Typography>
                    <Button component={Link} to="/" sx={{ textDecoration: 'none', color: 'white' }}>
                      Home
                    </Button>
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
                <Box margin={3}>
                    <Typography variant={'h2'} sx={{ width: '100%' }}>{`${name}`}</Typography>
                    <Typography variant={'h6'}>{`${type}`}</Typography>
                </Box>
                <Box display={'flex'} justifyContent={'center'} margin={3} marginLeft={60} marginRight={60}>
                    <Typography>{`${short}`}</Typography>
                </Box>
                <Box margin={3} marginLeft={40} marginRight={40}>
                    <Typography variant={'h5'}>Description</Typography>
                    <Box backgroundColor={'darkolivegreen'} border={2} borderRadius={2}>
                        <Typography sx={{ margin: 2, color: 'white'}}>{`${description}`}</Typography>
                    </Box>
                </Box>
            </Box>
        );
}


export default NewRecipe
