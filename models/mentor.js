var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var Schema = mongoose.Schema;

var mentorSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true });

mentorSchema.pre('save', async function (next) {
  if (this.password && this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
    next()
  }
  next()
});

mentorSchema.methods.verifyPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('Mentor', mentorSchema)