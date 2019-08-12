const routes = require('express').Router();
const s3 = require('../lib/services/aws/s3');
const config = require('../lib/config/config');
const recipes = require('../recipes.json');

routes.get("/", (req, res) => {
    res.render("recipes-front", {
        title: "Michael og Marias opskrifter",
        recipes: recipes.recipes
    });
});

routes.get('/recipe', (req, res) =>{
    const recipe = recipes.recipes.find(r => r.id === req.query.id);
    res.render("recipe", {
        title: `This is ${recipe.name}`,
        recipe
    })
});

routes.get('/addnew', (req, res) => {
    res.render('add-new-recipe')
});

routes.post('/addnew', async (req, res) => {
    console.log(req.body);
    await s3.PutObject(config.BucketName(), 'recipes.json', req.body);
    console.log('wtf!')
});

module.exports = routes;
