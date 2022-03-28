const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const gamesController = require('./games/GamesController');
const usersController = require('./users/UsersController');

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.send("HOME PAGE");
});

app.use("/", gamesController);
app.use("/", usersController);

app.listen(45678, () => {
    console.log("API RODANDO");
});