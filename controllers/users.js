const {response} = require('express');
const brcypt = require('bcryptjs');
const User = require('../models/user');

const {generateJWT} = require('../helpers/jwt');

const getUsuarios = async (req, res = response) => {
  try {
    const page = Number(req.query.page) || 0;

    const [users, total] = await Promise.all([
      User.find({}, 'id name email role img').skip(page * 5).limit(5),
      User.countDocuments()
    ]);

    res.status(200).json({msg: 'Users obtained correctly.', users, total});
  } catch (err) {
    console.warn(err);
    res.status(500).json({msg: 'Somthing went wrong. Please, try again later.'});
  }
}

const postUsuarios = async (req, res = response) => {
  const {email, pass} = req.body;

  try {

    const existingEmail = await User.findOne({email});
    if(existingEmail) {return res.status(400).json({msg: `${existingEmail.email} already exists`});}

    const user = new User(req.body);
    
    const salt = brcypt.genSaltSync();
    user.pass = brcypt.hashSync(pass, salt);
    
    await user.save();

    const token = await generateJWT(user.id);
  
    res.status(200).json({msg: 'User created correctly.', user, token});
  } catch (err) {
    console.warn(err);
    res.status(500).json({msg: 'Somthing went wrong. Please, try again later.'});
  }
}

const putUsuarios = async (req, res = response) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId);
    if (!user){return res.status(404).json({msg: `ID ${userId} not exists`});}

    //TODO: Validar token y comprobar que es el usuario correcto.

    const {pass, email, _id, role, google, img, ...campos} = req.body;

    const updatedUser = await User.findByIdAndUpdate(userId, campos, {new: true});

    res.status(200).json({msg: 'User updated correctly.', updatedUser});
  } catch (err) {
    console.warn(err);
    res.status(500).json({msg: 'Somthing went wrong. Please, try again later.'});
  }
};

const delUsuarios = async (req, res = response) => {
  const userId = req.params.id;
  console.log(userId);
  try {
    const user = await User.findById(userId);
    if (!user){return res.status(404).json({msg: `ID ${userId} not exists`});}
    
    await User.findByIdAndDelete(userId);

    res.status(200).json({msg: 'User deleted correctly.'});
  } catch (err) {
    console.warn(err);
    res.status(500).json({msg: 'Somthing went wrong. Please, try again later.'});
  }
};

module.exports = {
  getUsuarios,
  postUsuarios,
  putUsuarios,
  delUsuarios
}