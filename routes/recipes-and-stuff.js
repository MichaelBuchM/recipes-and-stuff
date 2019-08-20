const routes = require('express').Router();
const s3 = require('../lib/services/aws/s3');
const config = require('../lib/config/config');
const recipes = require('../recipes.json');
const categories = require('../categories');
const upload = require('../controller/upload/uploadS3');

routes.get("/", (req, res) => {
    res.render("recipes-front", {
        title: "Michael og Marias opskrifter",
        recipes: recipes.recipes
    });
});

routes.get('/recipe', (req, res, next) =>{
    const recipe = recipes.recipes.find(r => r.id === req.query.id);
    res.render("recipe", {
        title: `This is ${recipe.name}`,
        recipe
    })
});

routes.get('/addnew', (req, res, next) => {
    res.render('add-new-recipe', {
        category: categories.categories
    })
});

routes.post('/addnew', upload.uploadS3().array('photo',1), async function (req, res, next) {
    await s3.PutObject(config.BucketName(), `${req.body.category}/${req.body.name}/${req.body.name}.json`, req.body);
    res.send("Uploaded!");
});

module.exports = routes;
