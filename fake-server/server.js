const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(cors());

app.get('/services', (req, res) => {

    
    const services = fs.readFileSync('../services.json');
    res.json(JSON.parse(services));
});

app.listen(port, () => {
    console.log('app running at ' + port);
});
