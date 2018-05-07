'use strict';

const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
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

passport.use(new TwitterStrategy({
    consumerKey: authConfig.twitterAuth.consumerKey,
    consumerSecret: authConfig.twitterAuth.consumerSecret,
    callbackURL: authConfig.twitterAuth.callbackURL,
}, (token, refreshToken, profile, done) => {
    process.nextTick(() => {
        User.findOne({ 'twitter.id': profile.id }, (err, user) => {
            if(err)
                return done(err);
            if(user)
                return done(null, user);
            else {
                let newUser = new User();
                newUser.twitter.id = profile.id;
                newUser.twitter.username = profile.username;
                newUser.twitter.displayName = profile.displayName;
                newUser.ownedPolls = [];
                newUser.registrationTime = new Date();
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
