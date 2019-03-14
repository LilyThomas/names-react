const express = require('express')
const app = express()
const cors = require('cors')
const { auth, strategies, requiredScopes } = require('express-oauth2-bearer');
const jwtAuthz = require('express-jwt-authz');
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

// app.listen(process.env.PORT || 3000, () => {
//     console.log('Listening on port 3000');
// });

var names = ["Lily Thomas", "Simon Put"];


app.use(cors());

// const checkScopes = jwtAuthz([ 'read:apnames' ]);


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
//
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
    // checkScopes,

    (req, res) => {
    console.log(req.header('authorization'))
    res.json(names);
});

