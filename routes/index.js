var express = require('express');
var router = express.Router();
var controller = require('../controller/user');
var verify = require('../middleware/session');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });
router.get('/about', verify, function(req,res,next){
  res.render('about');
})
router.get('/logout', verify, function(req,res,next){
  req.session.destroy();
  res.render('login' , {text:'Thank you for visiting'});
})

router.get('/', function(req,res,next){
  res.render('register' , {title:'Register here!!'});
});

router.get('/login', function(req,res,next){
  res.render('login' , {title:'Login here!!'});
});

router.post('/' , controller.registerX);
router.post('/login', controller.loginX);

module.exports = router;
