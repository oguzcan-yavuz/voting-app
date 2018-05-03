'use strict';

const express = require('express');
const pollsController = require('../controllers/pollsController.js');
const usersController = require('../controllers/usersController.js');
let router = express.Router();


module.exports = (passport) => {

    function isLoggedIn(req, res, next) {
        if(req.isAuthenticated())
            return next();
        else
            res.redirect('/login');
    }

    // home
    router.get('/', isLoggedIn, async (req, res) => {
        let users = await usersController.getUsers();
        let polls = await pollsController.getPolls();
        console.log('users:', users);
        console.log("polls:", polls);
        res.render('index', { polls: polls });
    });

    // login
    router.get('/login', (req, res) => {
        res.render('login');
    });

    // logout
    router.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/login');
    });

    // authenticate github login with passport
    router.get('/auth/github', passport.authenticate('github'));

    // redirect after authenticate
    router.get('/auth/github/callback', passport.authenticate('github', {
        successRedirect: '/',
        failureRedirect: '/login'
    }));

    return router;
};
