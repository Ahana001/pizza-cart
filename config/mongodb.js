require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@cluster0.hulyh.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`)

mongoose.connection.on('connected', () => {
    console.log('database connected');
});
mongoose.connection.on('error', () => {
    console.log("error occurs while connecting to database");
});

module.exports = mongoose;