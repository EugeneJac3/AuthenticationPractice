var express = require('express');
var router = express.Router();
const { User } = require('../models');
const bcrypt = require("bcrypt");
const saltRounds = process.env.SALT_ROUNDS
const cookieParser = require('cookie-parser');
const {sign, verify } = require("jsonwebtoken")




console.log("user.js Salt rounds are:", process.env.SALT_ROUNDS);
/* GET users listing. */
router.get('/', async (req, res, next) => {
  res.render('index');
  // const users = await User.findAll();
  // console.log(users)
  // res.json(users);
});

router.post('/', (req,res, next)=>{

const password = "hello"

const saltRounds = bcrypt.genSaltSync(5);
const hash = bcrypt.hashSync(password, saltRounds);

console.log("my password", password);
console.log("my hashed password", hash);


bcrypt.hash(password, saltRounds, (err,hash) =>{

})

res.send ("user add")
})


/* POST register a new user. */

router.post('/register', async (req,res, next) => {
  let { username, password, email} = req.body;
  const saltRounds = bcrypt.genSaltSync(5);
  password = bcrypt.hashSync(password, saltRounds);
  console.log(username, password, email);

  const newUser = await User.create({
    username,
    password,
    email,
  });
  res.json({newUser});
  console.log("added new user");
})

// login


// YT Example


const createToken = (user) => {
  const accessToken = sign({username: user.username, id: user.id}, "jwtsecretplschange"
  );

  return accessToken;
  };





router.post('/login', async (req,res, next)=>{
  const {username, password} = req.body 
  
  const user = await User.findOne({
    where: {
      username: username
    }
  });

  if (!user) res.status(400).json({error: "User doesnt exist"});

  const dbpassword = user.password
  bcrypt.compare(password, dbpassword).then((match)=>{
    if (!match){
      res.status(400).json({error:"wrong username and password combination!"})
    } else {

      const accessToken = createToken(user)

      res.cookie("access-token", accessToken, {
        maxAge: 60*60*24*30*1000
      })

      res.json("Logged In")
    }
  });
  
  
  });


  const validateToken = (req,res, next) =>{
    const accessToken = req.cookies["access-token"]

    if (!accessToken) return res.status(400).json({error:"User not authenticated!"});

    try {
      const validToken = verify (accessToken, "jwtsecretplschange")
      if (validToken) {
        req.authenticated = true
        return next()
      }
    } catch(err) {
      return res.status(400).json({error: err});
    }
  };


  router.get("/profile", validateToken, (req, res) => {
    res.json("profile");
  })


  // console.log(user);
  // const dbPassword = user.password
  
  // const comparePass = bcrypt.compareSync(hash, dbPassword);




// DC Example
router.post('/login', async (req,res, next)=>{
const {username, password} = req.body 
const hash = bcrypt.hashSync(password, saltRounds);
const user = await User.findOne({
  where:{
    username: username
  }
});
console.log(user);
const dbPassword = user.password

const comparePass = bcrypt.compareSync(hash, dbPassword);




// if (comparePass){
//     const token = jwt.sign({
//       data: 'Free the ducks'
//     }, 
//     secretKey , // hide from everyone but our app
//     { expiresIn: '1h' });
    
//   res.cookie('Token', token)
// console.log("Authorized")
// } else {
//   console.log("No user found");
// }

res.send("works");

});


module.exports = router;
