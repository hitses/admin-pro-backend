const mongoose = require('mongoose');
const colors = require('colors');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    console.log('Database connected'.green)
  } catch (err) {
    console.log(err);
    throw new Error('Error trying to connect to database');
  }
}

module.exports = {
  dbConnection
}