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
            res.redirect('/');
    }

    // home
    router.get('/', async (req, res) => {
        let users = await usersController.getUsers();
        let polls = await pollsController.getPolls();
        console.log('users:', users);
        console.log("polls:", polls);
        res.render('index', { polls: polls, authenticated: req.isAuthenticated() });
    });

    // logout
    router.get('/logout', isLoggedIn, (req, res) => {
        req.logout();
        res.redirect('/');
    });

    // authenticate github login with passport
    router.get('/auth/github', passport.authenticate('github'));

    // redirect after authenticate
    router.get('/auth/github/callback', passport.authenticate('github', {
        successRedirect: '/',
        failureRedirect: '/'
    }));

    return router;
};
