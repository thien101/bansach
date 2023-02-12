
const express = require('express');
const app = express();
// template engine
const path = require('path');
const { engine } = require('express-handlebars');

// override methods http
const methodOverride = require('method-override')

// import connectToDB
const db = require('./config/db/connect');

// set tuyen duong: routes
const route = require('./routes/index');


const port = 3000;
app.use(express.static(path.join(__dirname, 'public')));

// doc url thanh or json => obj
app.use(
  express.urlencoded({
      extended: true,
  }),
);
app.use(express.json());

// set template engine
app.engine('hbs', engine({
  extname : 'hbs',
  helpers: {
    sum(a, b) {
        return a + b;
    },
},
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources/views'));

// kết nối vs mongDB
db.connectToDB();

// override with POST having ?_method=??
app.use(methodOverride('_method'))

route(app);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  })