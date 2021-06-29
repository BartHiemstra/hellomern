const express = require('express');
const fs = require('fs');
const https = require('https');
const cors = require('cors');
const mongoose = require('mongoose');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = "mongodb://admin:5DXZTXGgJVnY@localhost:27017/";
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("Server started successfully.");
})

const activitiesRouter = require('./routes/activities');
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/activities', activitiesRouter);
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

//app.listen(port, () => {
//    console.log(`Server is running on port: ${port}`);
//});

https.createServer({
  key: fs.readFileSync('privkey.pem'),
  cert: fs.readFileSync('fullchain.pem')
}, app)
.listen(port, function () {
  console.log('Example app listening on port 5000! Go to https://localhost:5000/')
})

app.get('/', function(req, res) {
	res.send('Hallo, wereld!')
})
