var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  // Setting the auth token in cookies
res.cookie('token', "Test Cookie");
res.render('index', { title: 'Express' });
});

// const authToken = req.cookies['token'];



/*Get protected page */
 // User logs in
  //Create JWT, save as cookie
  // When user accesses a protected route
  // Usew middleware to validate JWT
  // If valid, render route or next()
  // else throw error, redirect to login

// Middleware helper function example

const isValidUser = (req, res, next) => {
 


  // console.log("Users JWT is valid");
  // next();
  const userJWT = false;

  if (userJWT === true) {
    next();
  } else {
    res.redirect("/users");
  }
}




router.get("/protected", isValidUser, (req,res, next) =>{
  res.send("Authorized user, protected route");
})
module.exports = router;
