const express = require('express')
const app = express()
const cors = require('cors')

app.listen(process.env.PORT || 3000, () => {
    console.log('Listening on port 3000');
});

var names = ["Lily Thomas", "Simon Put"];

var originsWhitelist = ['http://localhost:4200'];

var corsOptions = {
    origin: function(origin, callback){
        var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
        callback(null, isWhitelisted);
    },
    credentials: true
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
    // console.log(req.headers);

    console.log(req.header('Authorization'));
    res.json(names)
})

