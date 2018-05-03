'use strict';

const passport = require('passport');
const GithubStrategy = require('passport-github').Strategy;
const User = require('../models/users.js');
const authConfig = require('./auth.js');


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    })
});

passport.use(new GithubStrategy({
    clientID: authConfig.githubAuth.clientID,
    clientSecret: authConfig.githubAuth.clientSecret,
    callbackURL: authConfig.githubAuth.callbackURL,
}, (token, refreshToken, profile, done) => {
    process.nextTick(() => {
        User.findOne({ 'github.id': profile.id }, (err, user) => {
            if(err)
                return done(err);
            if(user)
                return done(null, user);
            else {
                let newUser = new User();
                newUser.github.id = profile.id;
                newUser.github.displayName = profile.displayName;
                newUser.github.username = profile.username;
                newUser.ownedPolls = [];
                newUser.votedPolls = [];
                newUser.save((err) => {
                    if(err)
                        return done(err);
                    return done(null, newUser);
                })
            }
        })
    })
}));

module.exports = passport;
