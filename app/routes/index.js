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
        res.render('index', { polls: polls, user: req.user });
    });

    // poll details
    router.get('/polls/details/:pollId', (req, res) => {
        res.render('pollDetails', { user: req.user });
    });

    // poll details api
    router.get('/api/polls/details/:pollId', async (req, res) => {
        let pollId = req.params.pollId;
        let poll = await pollsController.getPoll(pollId);
        let loggedIn = req.isAuthenticated();
        res.json({ poll: poll, loggedIn: loggedIn });
    });

    // post vote
    router.post('/api/polls/vote/:pollId', async (req, res) => {
        // get the logged in user or IP address of unauthenticated user
        let pollId = req.params.pollId;
        let optionId = req.body.optionId;
        let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        let currentPerson = (req.isAuthenticated()) ? req.user.twitter.username : ip;
        let isVoted = await pollsController.isVoted(currentPerson, pollId);
        if(isVoted)
            res.status(406).json({ error: "You have already voted for this poll!" });
        else
            res.json({ poll: await pollsController.votePoll(pollId, optionId, currentPerson) });
    });

    // post option
    router.post('/api/polls/newOptions/:pollId', isLoggedIn, async (req, res) => {
        let pollId = req.params.pollId;
        let optionNames = req.body.options;
        res.json({ poll: await pollsController.pushOptions(pollId, optionNames) });
    });

    // delete poll
    router.get('/polls/delete/:pollId', isLoggedIn, (req, res) => {
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

    // authenticate twitter login with passport
    router.get('/auth/twitter', passport.authenticate('twitter'));

    // redirect after authenticate
    router.get('/auth/twitter/callback', passport.authenticate('twitter'), (req, res) => {
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
