const {response} = require('express');
const brcypt = require('bcryptjs');
const Doctor = require('../models/doctor');

const {generateJWT} = require('../helpers/jwt');

const getDoctors = async (req, res = response) => {
  try {
    const doctors = await Doctor.find({}).populate('user', 'name role email img').populate('hospital', 'name img');
    res.status(200).json({msg: 'Doctors obtained correctly.', doctors});
  } catch (err) {
    console.warn(err);
    res.status(500).json({msg: 'Something went wrong. Please, try again later.'});
  }
}

const postDoctor = async (req, res = response) => {
  try {
    const userId = req.userId;

    const doctor = new Doctor({
      user: userId,
      ...req.body
    });
    const doctorDB = await doctor.save();
    /* const users = await User.find({}, 'id name email role'); */
    res.status(200).json({msg: 'doctor created correctly.', doctor: doctorDB});
  } catch (err) {
    console.warn(err);
    res.status(500).json({msg: 'Something went wrong. Please, try again later.'});
  }
}

const putDoctor = async (req, res = response) => {
  try {
    const id = req.params.id;
    const userId = req.userId;

    const doctor = await Doctor.findById(id);
    if (!doctor) return res.status(404).json({msg: `Doctor with ID ${id} not found`});
    const changesDoctor = {
      ...req.body,
      user: userId
    }

    const updateDoctor = await Doctor.findByIdAndUpdate(id, changesDoctor, {new: true});

    res.status(200).json({msg: 'Doctor updated correctly.', updateDoctor});
  } catch (err) {
    console.warn(err);
    res.status(500).json({msg: 'Something went wrong. Please, try again later.'});
  }
}

const delDoctor = async (req, res = response) => {
  try {
    const id = req.params.id;
    
    const doctor = await Doctor.findById(id);
    if (!doctor){return res.status(404).json({msg: `Doctor with ID ${id} not exists`});}
    
    await Doctor.findByIdAndDelete(id);

    res.status(200).json({msg: 'Doctor deleted correctly.'});
  } catch (err) {
    console.warn(err);
    res.status(500).json({msg: 'Something went wrong. Please, try again later.'});
  }
}

module.exports = {
  getDoctors,
  postDoctor,
  putDoctor,
  delDoctor
}