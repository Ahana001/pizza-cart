const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const httpErrors = require('http-errors');
const fileUpload = require('express-fileupload');
require('dotenv').config();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(express.json());
app.use(fileUpload());

app.use(require('./routes/routes'));

//404 page
app.use(async (req, res, next) => {
    next(httpErrors.NotFound());
});

app.use(async (err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        status: err.status,
        Error: err.message
    });
});

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});