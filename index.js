const express = require('express');
const app = express();

require('dotenv').config();

app.get('/', (req, res) => {
    res.send('The project has been launched');
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
