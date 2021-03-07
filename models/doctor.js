const {Schema, model} = require('mongoose');

const doctor = Schema({
  name: {type: String, required: true},
  img: {type: String},
  user: {type: Schema.Types.ObjectId, required: true, ref: 'User'},
  hospital: {type: Schema.Types.ObjectId, required: true, ref: 'Hospital'}
});

doctor.method('toJSON', function() {
  const {__v, _id, ...object} = this.toObject();
  object.id = _id;
  return object;
})

module.exports = model('Doctor', doctor);