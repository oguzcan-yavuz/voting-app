'use strict';

const express = require('express');
const pollsController = require('../controllers/pollsController.js');
const usersController = require('../controllers/usersController.js');
let UsersController;
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
        let polls = await pollsController.getPolls();
        let users, currentUser, ownedPolls, isVoted, newPoll;
        if(req.isAuthenticated()) {
            // newPoll = await UsersController.createPoll("I guess sixth poll created from UsersController", "it works", "it doesn't works", "no idea");
            users = await UsersController.getAllUsers;
            currentUser = UsersController.getCurrentUser;
            ownedPolls = UsersController.getOwnedPolls;
            isVoted = UsersController.isVoted(polls[0]);
        }
        let renderVars = {
            polls: polls,
            authenticated: req.isAuthenticated(),
            username: (currentUser) ? currentUser.github.username : null
        };
        console.log("newPoll:", newPoll);
        console.log('users:', users);
        console.log("polls:", polls);
        console.log("current user:", currentUser);
        console.log("owned polls:", ownedPolls);
        console.log("isVoted:", isVoted);
        res.render('index', renderVars);
    });

    // logout
    router.get('/logout', isLoggedIn, (req, res) => {
        req.logout();
        res.redirect('/');
    });

    // profile
    router.get('/profile', isLoggedIn, (req, res) => {
        let currentUser = UsersController.getCurrentUser;
        res.render('profile', { user: currentUser });
    });

    // poll details
    router.get('/polls/:pollID', async (req, res) => {
        pollsController.getPoll(req.params.pollID)
            .then(poll => {
                res.render('pollDetails', { poll: poll });
            })
            .catch(err => {
                res.redirect('/');
            })
    });

    // authenticate github login with passport
    router.get('/auth/github', passport.authenticate('github'));

    // redirect after authenticate
    router.get('/auth/github/callback', passport.authenticate('github'), (req, res) => {
        // initialize UsersController with the logged in user if authentication is successful
        if(req.isAuthenticated())
            UsersController = new usersController(req.user);
        res.redirect('/');
    });

    return router;
};
