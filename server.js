const express = require('express')
const app = express()
const cors = require('cors')
const { auth, strategies, requiredScopes } = require('express-oauth2-bearer');
const jwtAuthz = require('express-jwt-authz');
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

// student code start

app.listen(process.env.PORT || 80, () => {
    console.log('Listening on port 80');
});

var names = ["Lily Thomas", "Simon Put"];


app.use(cors());

// student code end

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

// Student code start here

app.get('/',
    // checkScopes,

    (req, res) => {
    // console.log(req.header('authorization'))
    res.json(names);
});

// student code end here

