const express = require('express');
const app =  express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

require('dotenv/config');

const authRoute = require('./routes/auth');

app.use(bodyParser.json());
app.use(express.json());
app.use('/api/user', authRoute);
 
//connect to db
const mongoUri="mongodb+srv://sulthana:sulthana@crud.xngbi.mongodb.net/sulthana?retryWrites=true&w=majority"
mongoose.connect(
 mongoUri,
{useNewUrlParser: true },
() => console.log('connect to DB!')
);
//app.listen(5000, () => console.log('server up and running'));
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log("listening to 5000 ");
});