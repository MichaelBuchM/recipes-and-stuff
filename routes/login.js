const routes = require('express').Router();

routes.get('/', function(req, res, next) {
    res.render('index', { error: false });
});

module.exports = routes;
