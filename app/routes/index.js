'use strict';

const express = require('express');
const pollsController = require('../controllers/pollsController.js');
const UsersController = require('../controllers/usersController.js');
let usersController;
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
        let polls = await pollsController.getAllPolls();
        let currentUser = req.user;
        let renderVars = {
            polls: polls,
            user: currentUser
        };
        res.render('index', renderVars);
    });

    // poll details
    router.get('/polls/details/:pollId', async (req, res) => {
        let pollId = req.params.pollId;
        pollsController.getPoll(pollId)
            .then(poll => {
                res.render('pollDetails', { poll: poll });
            })
            .catch(err => {
                console.error(err);
                res.redirect('/');
            })
    });

    // delete poll
    router.get('/polls/delete/:pollId', isLoggedIn, async (req, res) => {
        let pollId = req.params.pollId;
        usersController.deleteOwnedPoll(pollId)
            .then(() => {
                res.redirect('/profile');
            })
            .catch(err => {
                console.error(err);
                res.send("You don't own this poll!");
            })
    });

    // new poll
    router.get('/polls/newpoll', isLoggedIn, (req, res) => {
        res.render('newpoll');
    });

    // new poll post
    router.post('/polls/newpoll/create', isLoggedIn, async (req, res) => {
        let title = req.body.pollTitle;
        let options = req.body.pollOptions;
        let newPoll = await usersController.createPoll(title, options);
        res.redirect('/polls/details/' + newPoll._id);
    });

    // profile
    router.get('/profile', isLoggedIn, async (req, res) => {
        let currentUser = usersController.getCurrentUser;
        let ownedPolls = await usersController.getOwnedPolls();
        res.render('profile', { user: currentUser, ownedPolls: ownedPolls });
    });

    // authenticate github login with passport
    router.get('/auth/github', passport.authenticate('github'));

    // redirect after authenticate
    router.get('/auth/github/callback', passport.authenticate('github'), (req, res) => {
        // initialize usersController with the logged in user if authentication is successful
        if(req.isAuthenticated())
            usersController = new UsersController(req.user);
        res.redirect('/');
    });

    // logout
    router.get('/logout', isLoggedIn, (req, res) => {
        req.logout();
        res.redirect('/');
    });

    return router;
};
