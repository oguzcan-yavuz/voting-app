'use strict';

require('dotenv').config();
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
require('./app/models/db.js').connectDB();   // create db connection
const session = require('./app/config/session');
const passport = require('./app/config/passport.js');
const router = require('./app/routes/index.js');
const PORT = process.env.PORT || 8080;
let app = express();

app.use('/static', express.static(path.join(__dirname, 'public')));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(favicon(path.join(__dirname, 'public', 'img', 'favicon.ico')));
app.use(session);
app.use(passport.initialize());
app.use(passport.session());
app.use(router(passport));
app.listen(PORT, () => {
    console.log("Server is listening on port " + PORT);
});
