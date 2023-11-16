# IngreRecipe
IngreRecipe: Discover recipes with available ingredients, your kitchen companion for culinary creativity.

# IngreRecipe


## Overview

IngreRecipe is a dynamic and simple food recipe application that helps you create delicious meals with the ingredients you have on hand. Say goodbye to the hassle of browsing through endless recipe websites; with IngreRecipe, you can enter your ingredients and discover exciting recipes at your fingertips.

## Features

- **Ingredient-Based Search:** Input the ingredients you have, and IngreRecipe will find recipes that match your inventory.

- **Recipe Suggestions:** Get a wide variety of recipes based on your available ingredients, ensuring you never run out of meal ideas.

- **User-Friendly Interface:** The application is designed to be easy to use, even for those with limited culinary experience.

- **Detailed Recipes:** Each recipe comes with step-by-step instructions, ingredient lists, and nutritional information.

- **Save and Share:** Save your favorite recipes and share them with friends and family.

## Development

Clone the repository to your local environment:

```bash
git clone https://github.com/EliRahmati/IngreRecipe.git
```

The repo contains three main folders
- postgres
- backend
- frontend

### Database
IngreRecipe utilizes a relational database to mange the users and their data. We have used PostgreSQL for this purpuse. One can launch the database using the following commands 

```bash
cd postgres
docker-compose up -d
```

### Backend
The backend has been developed in python by using FastAPI. UVicorn serving as the ASGI server. The backend leverages the capabilities of UVicorn and could be started using the following command

```bash
cd backend
uvicorn main:app --reload
```

The server should be running now on [http://127.0.0.1:8000](http://127.0.0.1:8000)
The FastAPI will generate a swagger documentation of all the endpoints on [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

### Frontend




# Recources
[https://www.w3schools.com/css](https://www.w3schools.com/css)
[https://mui.com/system/getting-started](https://mui.com/system/getting-started)
