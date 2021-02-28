const {response} = require('express');
const brcypt = require('bcryptjs');
const User = require('../models/user');
const {generateJWT} = require('../helpers/jwt');

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
    res.status(500).json({msg: 'Somthing went wrong. Please, try again later.'});
  }
}

module.exports = {
  login
}