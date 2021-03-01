const {response} = require('express');
const brcypt = require('bcryptjs');
const User = require('../models/user');

const {generateJWT} = require('../helpers/jwt');

const getHospitales = async (req, res = response) => {
  try {
    /* const users = await User.find({}, 'id name email role'); */
    res.status(200).json({msg: 'Hospitals obtained correctly.'});
  } catch (err) {
    console.warn(err);
    res.status(500).json({msg: 'Somthing went wrong. Please, try again later.'});
  }
}

const postHospital = async (req, res = response) => {
  try {
    /* const users = await User.find({}, 'id name email role'); */
    res.status(200).json({msg: 'Hospitals created correctly.'});
  } catch (err) {
    console.warn(err);
    res.status(500).json({msg: 'Somthing went wrong. Please, try again later.'});
  }
}

const putHospital = async (req, res = response) => {
  try {
    /* const users = await User.find({}, 'id name email role'); */
    res.status(200).json({msg: 'Hospitals updated correctly.'});
  } catch (err) {
    console.warn(err);
    res.status(500).json({msg: 'Somthing went wrong. Please, try again later.'});
  }
}

const delHospital = async (req, res = response) => {
  try {
    /* const users = await User.find({}, 'id name email role'); */
    res.status(200).json({msg: 'Hospitals deleted correctly.'});
  } catch (err) {
    console.warn(err);
    res.status(500).json({msg: 'Somthing went wrong. Please, try again later.'});
  }
}

module.exports = {
  getHospitales,
  postHospital,
  putHospital,
  delHospital
}