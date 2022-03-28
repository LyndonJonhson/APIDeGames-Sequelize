const jwt = require('jsonwebtoken');

const jwtSecret = "mfldfildfildimfdl";

module.exports = function Auth(req, res, next){
    const authToken = req.headers['authorization'];
    if(authToken != undefined){
        const bearer = authToken.split(' ');
        var token = bearer[1];
        jwt.verify(token, jwtSecret, (err, data) => {
            if(err){
                res.status(401);
                res.json({err: "Token inválido!"});
            }else{                
                next();
            }
        })
    }else{
        res.status(401);
        res.json({err: "Você não está autenticado!"});
    }
}