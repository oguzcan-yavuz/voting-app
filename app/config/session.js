const session = require('express-session');

module.exports = session({
    secret: 'voting app',
    resave: false,
    saveUninitialized: true,
});
