const { Router } = require('express');
const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {registerValidation,loginValidation} = require('../routes/validation');


router.post('/register',async (req, res) => {
    const {error} = registerValidation(req.body);
   if (error) return res.status(400).send(error.details[0].message);
   //checkng  user
   const emailExist = await User.findOne({email:req.body.email});
   if(emailExist) return res.status(400).send('Email already exist');
   //hash passwrd
   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(req.body.password, salt);

   const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });
    try{
         const savedUser = await user.save();
         res.send({user: user._id});
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post('/signin',async (req,res) =>{
    //validate
    const {error} = loginValidation(req.body);
    if (error) return res.status(402).send(error.details[0].message);
    const user = await User.findOne({email:req.body.email});
   if(!user) return res.status(400).send('Email is not found');
   //passwrd is crct
   const validPass = await bcrypt.compare(req.body.password, user.password);
   if(!validPass) return res.status(401).send('Invalid password')
    //crt n assgn tkn
           // const token = jwt.sign({_id: user._id}, '${process.env.SECRET_KEY}' );
         // res. header('auth-token', token).send(token);
  res.send('Logged in!');
});




module.exports = router;