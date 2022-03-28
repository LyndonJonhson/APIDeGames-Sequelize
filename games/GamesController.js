const express = require('express');
const router = express.Router();
const Game = require('./Game');
const Auth = require('../middleware/Auth');

router.get("/games", Auth, (req, res) => {
    Game.findAll().then(games => {
        res.status(200);
        res.json(games);
    });    
});

router.get("/game/:id", Auth, (req, res) => {
    var id = req.params.id;
    if(!isNaN(id)){
        Game.findOne({where: {id: id}}).then(game => {
            if(game != undefined){
                res.status(200);
                res.json(game);
            }else{
                res.status(400);
                res.json({err: "Não existe jogo com este ID!"});
            }
        }).catch(err => {
            res.status(500);
            res.json({err: err});
        });
    }else{
        res.status(400);
        res.json({err: "URL inválida!"});
    }
    
});

router.post("/game", Auth, (req, res) => {
    var { title, year, price } = req.body;
    if(title != undefined && year != undefined && price != undefined){
        Game.findOne({where: {title: title}}).then(game => {
            if(game == undefined){
                Game.create({
                    title: title,
                    year: year,
                    price: price
                }).then(() => {
                    res.status(200);
                    res.send("O jogo foi adicionado com sucesso!");
                }).catch(err => {
                    res.status(500);
                    res.json({err: err});
                })
            }else{
                res.status(400);
                res.json({err: "O jogo já está cadastrado!"});
            }
        }).catch(err => {
            res.status(500);
            res.json({err: err});
        })
    }else{
        res.status(400);
        res.json({err: "Dados inválidos!"});
    }    
});

router.delete("/game/:id", Auth, (req, res) => {
    var id = req.params.id;
    if(!isNaN(id)){
        Game.findOne({where: {id : id}}).then(game => {
            if(game != undefined){
                Game.destroy({where: {id: id}});
                res.status(200);
                res.send("O jogo foi deletado com sucesso!")
            }else{
                res.status(400);
                res.json({err: "O jogo não existe, logo não pode ser deletado!"});
            }
        }).catch(err => {
            res.status(500);
            res.json({err: err});
        });
    }else{
        res.status(400);
        res.json({err: "URL inválida!"});
    }    
});

router.put("/game/:id", Auth, (req, res) => {
    var id = req.params.id;
    if(!isNaN(id)){
        Game.findOne({where: {id: id}}).then(game => {
            if(game != undefined){
                var {title, year, price} = req.body;
                if(title != undefined){
                    Game.update({title: title}, {where: {id: id}});
                }
                if(year != undefined){
                    Game.update({year: year}, {where: {id: id}});
                }
                if(price != undefined){
                    Game.update({price: price}, {where: {id: id}});
                }
                res.status(200);
                res.send("Jogo atualizado com sucesso!");
            }else{
                res.status(400);
                res.json({err: "Não existe um jogo com este ID!"});
            }
        }).catch(err => {
            res.status(500);
            res.json({err: err});
        });
    }else{
        res.status(400);
        res.json({err: "URL inválida!"});
    }
});

module.exports = router;