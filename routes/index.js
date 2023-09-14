var express = require('express');
var router = express.Router();
const passport = require('passport')
const index = require('../controllers/index')

router.get('/', function(req, res, next) {
  res.redirect('/home');
});

router.get('/home', index.home)

router.get('/auth/google', passport.authenticate(
  //what is the strategy?
  'google',
  {
    scope: ['profile', 'email'],
    //optional-prompts you to approve what account you're signing in with
    prompt: 'select_account'
  }

))

router.get('/oauth2callback', passport.authenticate(
  'google',
  {
    successRedirect: '/home',
    // Change this to what's best for your current app! 
    failure: '/home'
  }
))

router.get('/logout', function(req, res) {
  req.logout(function() {
    // Change this to what's best for your current app!
    res.redirect('/home')
  })
})
module.exports = router;
