const {Schema, model} = require('mongoose');

const hospital = Schema({
  name: {type: String, required: true},
  img: {type: String},
  user: {type: Schema.Types.ObjectId, required: true, ref: 'User'}
});

hospital.method('toJSON', function() {
  const {__v, _id, ...object} = this.toObject();
  object.id = _id;
  return object;
})

module.exports = model('Hospital', hospital);