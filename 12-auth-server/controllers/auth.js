const { response, request } = require("express");
const User = require("../models/User");
const bcrypt = require('bcryptjs');
const { generateJWT } = require("../helpers/jwt");

const createUser = async (req = request, res = response) => {
  
  const {email, name, password} = req.body;

  try {

    let user = await User.findOne({email});
    
    if(user){
      return res.status(400).json({
        ok: false,
        msg: 'This user is already exists'
      });
    }

    user = new User(req.body);

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    const token = await generateJWT(user.id, name);

    await user.save();

    return res.status(201).json({
      ok: true,
      uid: user.id,
      email,
      name,
      token
    });


  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: true,
      msg: "Please talk with administrator",
    });  
  }

  
};

const authenticateUser = async (req = request, res = response) => {

  const {email, password} = req.body;

  try {
    
    const user = await User.findOne({email});

    if(!user){
      return res.status(400).json({
        ok: false,
        msg: 'The email or password are invalid'
      });
    }

    const isValidPassword = bcrypt.compareSync(password, user.password);

    if(!isValidPassword){
      return res.status(400).json({
        ok: false,
        msg: 'The email or password are invalid'
      });
    }

    const token = await generateJWT(user.id, user.name);

    return res.status(200).json({
      ok: true,
      uid: user.id,
      name: user.name,
      email,
      token
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Please talk with administrator",
    });
  }

  
};

const renewToken = async (req = request, res = response) => {

  const {uid} = req.user;

  const user = await User.findById(uid);

  const token = await generateJWT(uid, user.name);

  return res.json({
    ok: true,
    uid,
    name: user.name,
    email: user.email,
    token
  });
};

module.exports = {
  createUser,
  authenticateUser,
  renewToken
};
