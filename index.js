'use strict';

const express = require('express');
const app = express();
const helmet = require('helmet');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || '3000';

const dotenv = require('dotenv');
dotenv.config();

app.use(helmet());
app.use(express.json());

app.set("view engine", "pug");
app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({ extended: true }));


app.use('/', require('./routes/login'));
app.use('/health', require('./routes/health'));
app.use('/recipes-and-stuff', require('./routes/recipes-and-stuff'));

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}!`);
});
