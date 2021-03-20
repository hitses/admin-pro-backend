const response = require('express');
const path = require('path');
const fs = require('fs')

const { v4: uuid } = require('uuid');
const { uploadImg } = require('../helpers/uploadImg');

const fileUpload = (req, res = response) => {
  try {
    const {document, id} = req.params;
    const types = ['users', 'hospitals', 'doctors'];

    if (!types.includes(document)) {
      return res.status(400).json({msg: `Type ${document} not found`});
    }

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({msg: 'No files were uploaded'});
    }

    const file = req.files.img;
    const splitName = file.name.split('.');
    const extensionFile = splitName[splitName.length - 1];
    const validExtensions = ['png', 'jpg', 'jpeg'];

    if (!validExtensions.includes(extensionFile)) {
      return res.status(400).json({msg: 'Invalid extension file'});
    }

    const fileName = `${uuid()}.${extensionFile}`;

    const filePath = `./uploads/${document}/${fileName}`;

    file.mv(filePath, (err) => {
      if (err){
        console.log(err);
        return res.status(500).json({msg: 'Somthing went wrong. Please, try again later.'});
      }

      uploadImg(document, id, fileName);

      res.status(200).json({msg: `File ${fileName} uploaded correctly`, name: fileName});
    });
  } catch (err) {
    console.warn(err);
    res.status(500).json({msg: 'Somthing went wrong. Please, try again later.'});
  }
}

const downloadImg = (req, res = response) => {
  try {
    const {document, file} = req.params;
    const filePath = path.join(__dirname, `../uploads/${document}/${file}`);
    const noImgPath = path.join(__dirname, '../uploads/default/noImg.png');

    if (fs.existsSync(filePath)) {
      res.sendFile(filePath);
    } else {
      res.sendFile(noImgPath);
    }
    
  } catch (err) {
    console.warn(err);
    res.status(500).json({msg: 'Somthing went wrong. Please, try again later.'});
  }
}

module.exports = {
  fileUpload,
  downloadImg
}