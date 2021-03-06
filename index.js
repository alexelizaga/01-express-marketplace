const express = require('express');
// require('dotenv').config();

// console.log( process.env );

const app = express();

app.use(express.static('public'));

app.use('/v1/authorize', require('./routes/authorize'));

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});