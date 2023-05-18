const bookmarkJobModel = require('../Models/Company/bookmarkjobModel');
const Company = require('../Models/Company/companyModel');
const JobModel = require('../Models/Company/jobModel')
class CompanyClt {
  async createNewCompany(req, res) {
    try {
      const {
        name, description, website, employeeSize, headquarter, type, since, specialization, createdBy
      } = req.body;
      const company = await Company.create({
        name, description, website, employeeSize, headquarter, type, since, specialization,
        createdBy: req.user._id
      })
      res.status(201).json({ company });
    } catch (err) {
      res.status(500).json({
        message: 'Something went wrong',
        Error: err.stack
      });
    }
  }
  async getCompany(req, res) {
    try {
      const company = await Company.findOne({ _id: req.params.id })
        .populate("follow", "name email")
      res.status(201).json({ company });
    } catch (err) {
      res.status(500).json({
        message: 'Something went wrong',
        Error: err.stack
      });
    }
  }

  async followCompany(req, res) {
    try {
      const company = await Company.findOne({ _id: req.params.id });
      if (company.follow.includes(req.user._id)) {
        throw new Error("Already followed")
      }
      company.follow.push(req.user._id);
      await company.save()
      res.status(201).json({ msg: "followed" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Something went wrong', err: err.message });
    }
  }
}
class Job {
  constructor() {

  }
  async createJob(req, res) {
    try {
      const {
        jobDescription, image, company, PositionLevel, Workspace, type, Location, City, salary, Experience, Specialization
      } = req.body;
      const job = await JobModel.create({
        jobDescription, image, company, PositionLevel, Workspace, type, Location, City, salary, Experience, Specialization
      })

      res.status(200).json({ job });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
  async getJobs(req, res) {
    try {
      const jobs = await JobModel.find({ company: req.params.id }).populate("company", "name");
      res.status(200).json({ jobs });

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
  async filterJobs(req, res) {
    try {
      const { Workspace, type, PositionLevel, City, minSalary, maxSalary, Experience, specialization, lastUpdated = 'anytime' } = req.body;

      const timeRanges = {
        recent: 24 * 60 * 60 * 1000,
        lastWeek: 7 * 24 * 60 * 60 * 1000,
        lastMonth: 30 * 24 * 60 * 60 * 1000,
        anytime: 0
      };
      console.log(timeRanges[lastUpdated])
      let timeRange = new Date(new Date().getTime() - timeRanges[lastUpdated]);
      const currentDate = new Date();
      const jobs = await JobModel.find({
        $and: [
          { Workspace },
          { type },
          { PositionLevel },
          { City },
          { salary: { $gte: minSalary, $lte: maxSalary } },
          { Experience },
          { Specialization: { $in: specialization } },
          { createdAt: { $gte: timeRange.toISOString() } }
        ]
      }).populate("company" ,"description name website employeeSize since specialization")
      
      res.status(200).json({ jobs });
      

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Something went wrong' });
    }
  }
}
class BookMark {
  constructor() {

  }
  async saveJob(req, res) {
    try {
      const saveJob = await bookmarkJobModel.create({
        job: req.body.jobId,
        user: req.user._id
      })

      res.status(200).json({ saveJob });
    } catch (err) {
      // console.error(err);
      res.status(500).json({ message: err.stack });
    }
  }
  async getSavedJobs(req, res) {
    try {
      const jobs = await bookmarkJobModel.find({});
      res.status(200).json({ jobs });

    } catch (err) {
      res.status(500).json({ message: err });
    }
  }
}
const cmp = new CompanyClt();
const job = new Job();
const bookMarkJob = new BookMark()
module.exports = {
  cmp,
  job, bookMarkJob
}


