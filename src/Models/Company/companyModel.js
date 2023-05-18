const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  website: { type: String },
  industry: { type: String },
  employeeSize: { type: Number },
  headquarter: {
    address: { type: String },
    city: { type: String },
    state: { type: String },
    country: { type: String }
  },
  type: { type: String },
  since: { type: Date },
  specialization: [],
  // add follow field
  follow: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Company', companySchema);
