const express = require('express');
const app = express();
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const port = process.env.port || 9000;
const dotenv = require('dotenv');
dotenv.config();
const employeeController = require('./controllers/employee');


app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//template setup
const hbs = exphbs.create({extname: ".hbs"});
app.engine('.hbs', hbs.engine )
app.set('view engine', '.hbs');

//mongoose setup 

mongoose.connect(process.env.CONNECTIONSTRING, {useNewUrlParser:true, useUnifiedTopology:true});
let DB = mongoose.connection;

DB.on('err', (err) => console.log(err));
DB.once('open', ()=> console.log('Connection to Mongodb successful'));

app.use('/', employeeController);

app.listen(port, ()=> console.log(`Connection to the port ${port} was successful`));

