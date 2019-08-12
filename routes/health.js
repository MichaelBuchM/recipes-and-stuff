const routes = require('express').Router();

routes.get('/', async (req, res) => {
    res.status(200).json({'message': `Shit is healthy!`}).end();
});

module.exports = routes;
