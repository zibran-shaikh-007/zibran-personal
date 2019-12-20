if(process.env.NODE_ENV !== "production"){
    require('dotenv').config();
}

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const port = process.env.port|| 9999;
const libraryRoute = require("./routes/library");

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

//template setup
app.engine('hbs', exphbs({extname: 'hbs'}));
app.set('view engine', 'hbs');

//Database setup
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser:true, useUnifiedTopology:true});
let DB = mongoose.connection;

DB.on('err', (err)=> console.error(`Error ${err} has occured`));
DB.once('open', ()=> console.log("Database has connected"));

app.use('/', libraryRoute);

app.listen(port, ()=> console.log(`Connected to the port ${port} and running`))

