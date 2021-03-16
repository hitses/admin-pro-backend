const {response} = require('express');
const brcypt = require('bcryptjs');
const User = require('../models/user');
const {generateJWT} = require('../helpers/jwt');
const { verifyGoogle } = require('../helpers/googleVerify');

const login = async (req, res = response) => {
  const {email, pass} = req.body;
  try {
    const user = await User.findOne({email});
    if (!user){return res.status(404).json({msg: `Email ${email} or password wrong`})}

    const validPass = brcypt.compareSync(pass, user.pass);
    if (!validPass){return res.status(400).json({msg: `Email ${email} or password wrong`})}

    const token = await generateJWT(user.id);

    res.status(200).json({msg: 'Users loged correctly.', token});
  } catch (err) {
    console.warn(err);
    res.status(500).json({msg: 'Something went wrong. Please, try again later.'});
  }
}

const googleLogIn = async (req, res) => {
  try {
    const googleToken = req.body.token;
    const {name, email, picture} = await verifyGoogle(googleToken);
    
    const userDb = await User.findOne({email});
    let user;
    if (!userDb) {
      user = new User({
        name,
        email,
        pass: 'V1v4n_1o5_p3rrit0s',
        img: picture,
        google: true
      });
    } else {
      user = userDb;
      user.google = true;
    }

    await user.save();

    const token = await generateJWT(user.id);

    res.status(200).json({msg: `User created correctly`, token});
  } catch (err) {
    console.warn(err);
    res.status(500).json({msg: 'Something went wrong. Please, try again later.'});
  }
}

const tokenRenew = async (req, res) => {
  try {
    const userId = req.userId;
    const token = await generateJWT(userId);
    const user = await User.findById(userId);

    if (!user){return res.status(404).json({msg: `User with ID ${userId} not found`})}

    res.status(200).json({msg: `Token renewed correctly`, user, token});
  } catch (err) {
    console.warn(err);
    res.status(500).json({msg: 'Something went wrong. Please, try again later.'});
  }
}

module.exports = {
  login,
  googleLogIn,
  tokenRenew
}