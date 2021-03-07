const fs = require('fs');

const User = require('../models/user');
const Hospital = require('../models/hospital');
const Doctor = require('../models/doctor');

const deleteFile = (path) => {
  if (fs.existsSync(path)) {
    fs.unlinkSync(path);
  }
}

let oldPath = '';

const uploadImg = async (document, id, fileName) => {
  switch (document) {
    case 'users':
      const user = await User.findById(id);
      if (!user) {
        console.log(`User with ID ${id} not found`);
        return false;
      }

      oldPath = `./uploads/users/${user.img}`;
      deleteFile(oldPath)

      user.img = fileName;
      await user.save();
      return true;
    case 'hospitals':
      const hospital = await Hospital.findById(id);
      if (!hospital) {
        console.log(`Hospital with ID ${id} not found`);
        return false;
      }

      oldPath = `./uploads/hospitals/${hospital.img}`;
      deleteFile(oldPath)

      hospital.img = fileName;
      await hospital.save();
      return true;
    case 'doctors':
      const doctor = await Doctor.findById(id);
      if (!doctor) {
        console.log(`Doctor with ID ${id} not found`);
        return false;
      }

      oldPath = `./uploads/doctors/${doctor.img}`;
      deleteFile(oldPath)

      doctor.img = fileName;
      await doctor.save();
      return true;
  
    default:
      return res.status(400).json({msg: `Document ${document} not found`});
  }
}

module.exports = {
  uploadImg
}