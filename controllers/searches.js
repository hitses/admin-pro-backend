const {response} = require('express');

const User = require('../models/user');
const Hospital = require('../models/hospital');
const Doctor = require('../models/doctor');

const getAll = async (req, res = response) => {
  try {
    const {search} = req.params;
    const regex = new RegExp(search, 'i');

    const [users, hospitals, doctors] = await Promise.all([
      User.find({name: regex}),
      Hospital.find({name: regex}),
      Doctor.find({name: regex})
    ]);

    res.status(200).json({msg: 'All obtained correctly.', users, hospitals, doctors});
  } catch (err) {
    console.warn(err);
    res.status(500).json({msg: 'Somthing went wrong. Please, try again later.'});
  }
}

const getCollection = async (req, res = response) => {
  try {
    const document = req.params.document;
    const search = req.params.search;
    const regex = new RegExp(search, 'i');
    let results = [];

    switch (document) {
      case 'users':
        results = await User.find({name: regex});
        break;
    
      case 'hospitals':
        results = await Hospital.find({name: regex}).populate('user', 'name img');
        break;
    
      case 'doctors':
        results = await Doctor.find({name: regex}).populate('user', 'name img').populate('hospital', 'name img');
        break;
    
      default:
        return res.status(400).json({msg: `Document ${document} not found`});
    }

    res.status(200).json({msg: 'All obtained correctly.', results});
  } catch (err) {
    console.warn(err);
    res.status(500).json({msg: 'Somthing went wrong. Please, try again later.'});
  }
}

module.exports = {
  getAll,
  getCollection
}