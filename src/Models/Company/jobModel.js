const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    // jobDescription,image,PositionLevel,Workspace,type,Location,City,salary,Experience
  jobDescription: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  PositionLevel: {
    type: String,
    required: true
  },
  Workspace: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
Location: {
    type: String,
    required: true
  },  
  City: {
    type: String,
    required: true
  },
  salary: {
    type: Number,
    required: true
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  Experience: {
    type: String,
    required: true
  },
  Specialization: [],
  createdAt: {
    type: String,
    default: new Date()
  }
});

const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
