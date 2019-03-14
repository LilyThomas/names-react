const express = require('express')
const app = express()
const cors = require('cors')
const { auth, strategies, requiredScopes } = require('express-oauth2-bearer');
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

app.listen(process.env.PORT || 3000, () => {
    console.log('Listening on port 3000');
});

var names = ["Lily Thomas", "Simon Put"];

var corsOptions = {
    origin: function(origin, callback){
        callback(null, 'http://localhost:4200');
    },
    credentials: true
};

app.use(cors(corsOptions));

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

var jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://pettinder.eu.auth0.com/.well-known/jwks.json'
    }),
    aud: 'returnnames.com',
    issuer: 'https://pettinder.eu.auth0.com/',
    algorithms: ['RS256']
});

app.use(jwtCheck);

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-type,Authorization');
//     next();
// });
//
// app.use(auth(strategies.openid({
//     issuerBaseURL: 'https://pettinder.eu.auth0.com/',
//     allowedAudiences: 'returnnames.com'
// })));

app.get('/',
    // requiredScopes('apname.read'),
    // (req, res) => {
    // console.dir(req.auth.claims);
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    // res.sendStatus(200);
    (req, res) => {
    console.log(req.header('authorization'))
    res.json(names);
});

