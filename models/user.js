const {Schema, model} = require('mongoose');

const user = Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  pass: {type: String, required: true},
  img: {type: String},
  role: {type: String, required: true, default: 'user'},
  google: {type: Boolean, default: false}
});

user.method('toJSON', function() {
  const {__v, _id, pass, ...object} = this.toObject();
  object.id = _id;
  return object;
})

module.exports = model('User', user);