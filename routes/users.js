var express = require('express');
var router = express.Router();
const { User } = require('../models');
const bcrypt = require("bcrypt");
const saltRounds = process.env.SALT_ROUNDS
// console.log(User)


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

router.post('/login', async (req,res, next)=>{
const {username, password} = req.body // Req.body is the index.ejs,  given the path in the body
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
