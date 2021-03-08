const {response} = require('express');
/* const brcypt = require('bcryptjs'); */
const Hospital = require('../models/hospital');

/* const {generateJWT} = require('../helpers/jwt'); */

const getHospitals = async (req, res = response) => {
  try {
    const hospitals = await Hospital.find({}).populate('user', 'name role email img');
    res.status(200).json({msg: 'Hospitals obtained correctly.', hospitals});
  } catch (err) {
    console.warn(err);
    res.status(500).json({msg: 'Something went wrong. Please, try again later.'});
  }
}

const postHospital = async (req, res = response) => {
  try {
    const userId = req.userId;

    const hospital = new Hospital({
      user: userId,
      ...req.body
    });
    const hospitalDB = await hospital.save();
    /* const users = await User.find({}, 'id name email role'); */
    res.status(200).json({msg: 'Hospital created correctly.', hospital: hospitalDB});
  } catch (err) {
    console.warn(err);
    res.status(500).json({msg: 'Something went wrong. Please, try again later.'});
  }
}

const putHospital = async (req, res = response) => {
  try {
    const id = req.params.id;
    const userId = req.userId;

    const hospital = await Hospital.findById(id);
    if (!hospital) return res.status(404).json({msg: `Hospital with ID ${id} not found`});
    const changesHospital = {
      ...req.body,
      user: userId
    }

    const updateHospital = await Hospital.findByIdAndUpdate(id, changesHospital, {new: true});

    res.status(200).json({msg: 'Hospital updated correctly.', updateHospital});
  } catch (err) {
    console.warn(err);
    res.status(500).json({msg: 'Something went wrong. Please, try again later.'});
  }
}

const delHospital = async (req, res = response) => {
  try {
    const id = req.params.id;
    
    const hospital = await Hospital.findById(id);
    if (!hospital){return res.status(404).json({msg: `Hospital with ID ${id} not exists`});}
    
    await Hospital.findByIdAndDelete(id);

    res.status(200).json({msg: 'Hospital deleted correctly.'});
  } catch (err) {
    console.warn(err);
    res.status(500).json({msg: 'Something went wrong. Please, try again later.'});
  }
}

module.exports = {
  getHospitals,
  postHospital,
  putHospital,
  delHospital
}