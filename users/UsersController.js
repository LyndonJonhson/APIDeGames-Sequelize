const express = require('express');
const router = express.Router();
const User = require('./User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const jwtSecret = "mfldfildfildimfdl";

router.post("/auth", (req, res) => {
    var {email, password} = req.body;
    if(email != undefined){
        User.findOne({where: {email: email}}).then(user => {
            if(user != undefined){
                var correct = bcrypt.compareSync(password, user.password);
                if(correct){
                    jwt.sign({name: user.name, email: user.email}, jwtSecret, {expiresIn: '24h'}, (err, token) => {
                        if(err){
                            res.status(500);
                            res.json({err: "Falha interna"});
                        }else{
                            res.status(200);
                            res.json({token: token});
                        }
                    });
                }else{
                    res.status(401);
                    res.json({err: "Credenciais inválidas"});
                }
            }else{
                res.status(404);
                res.json({err: "O E-mail enviado não existe"});
            }
        }).catch(err => {
            res.status(500);
            res.json({err: "Falha interna"});
        });
    }else{
        res.status(400);
        res.json({err: "E-mail inválido"});
    }
});

router.post("/user", (req, res) => {
    var {name, email, password} = req.body;
    User.findOne({where: {email: email}}).then(user => {
        if(user == undefined){
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(password, salt);
            User.create({
                name: name,
                password: hash,
                email: email
            }).then(() => {
                res.status(200);
                res.send("Conta criada com sucesso!");
            }).catch(err => {
                res.status(500);
                res.json({err: "Falha interna!"});
            });
        }else{
            res.status(406);
            res.json({err: "Email já utilizado!"});
        }
    }).catch(err => {
        res.status(500);
        res.json({err: "Falha interna!"});
    });
});

module.exports = router;