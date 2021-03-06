var express = require('express');
var router = express.Router();var uid2 = require('uid2')

var SHA256 = require('crypto-js/sha256')
var encBase64 = require('crypto-js/enc-base64')
var uid2 = require("uid2");

var userModel = require('../models/users')
var recettesModel = require('../models/recettes')



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/sign-up', async function(req,res,next){

  var error = []
  var result = false
  var saveUser = null
  var token = null

  const data = await userModel.findOne({
    email: req.body.emailFromFront
  })

  if(data != null){
    error.push('utilisateur déjà présent')
  }

  if(req.body.usernameFromFront == ''
  || req.body.emailFromFront == ''
  || req.body.passwordFromFront == ''
  ){
    error.push('champs vides')
  }


  if(error.length == 0){

    var salt = uid2(32)
    var newUser = new userModel({
      username: req.body.usernameFromFront,
      email: req.body.emailFromFront,
      password: SHA256(req.body.passwordFromFront+salt).toString(encBase64),
      token: uid2(32),
      salt: salt,
     
    })
  
    saveUser = await newUser.save()
  
    
    if(saveUser){
      result = true
      token = saveUser.token
    }
  }
  

  res.json({result, saveUser, error, token})
})

router.post('/sign-in', async function(req,res,next){

  var result = false
  var user = null
  var error = []
  var token = null
  
  if(req.body.emailFromFront == ''
  || req.body.passwordFromFront == ''
  ){
    error.push('champs vides')
  }

  if(error.length == 0){
    const user = await userModel.findOne({
      email: req.body.emailFromFront,
    })
  
    
    if(user){
      const passwordEncrypt = SHA256(req.body.passwordFromFront + user.salt).toString(encBase64)

      if(passwordEncrypt == user.password){
        result = true
        token = user.token
      } else {
        result = false
        error.push('mot de passe incorrect')
      }
      
    } else {
      error.push('email incorrect')
    }
  }
  

  res.json({result, user, error, token})


})


router.post('/ajoutrecette', async function(req,res,next){
  
  var result = false

  var user = await userModel.findOne({token: req.body.token})

  if(user != null){
  var newRecettes = new recettesModel({
    userId: user._id,
    nameRecette: req.body.nameRecette,
    typeRecette: req.body.typeRecette,
    recette: req.body.recette,
    
  })
  
  var recetteSaved = await newRecettes.save();
  if(recetteSaved.name){
    result = true
  }
} 
   res.json({ result })


  
})

router.delete('/deleterecette', async function(req,res,next){
  var result = false
  var user = await userModel.findOne({token: req.body.token})

  if(user != null){
    var returnDb = await recettesModel.deleteOne({recette: req.params.recette, userId: user._id})

    if(returnDb.deletedCount == 1){
      result = true
    }
  }

  res.json({result})
})



router.get('/logout', function(req,res,next){

  req.session.user = null;

  res.redirect('/users/login')
})


module.exports = router;
