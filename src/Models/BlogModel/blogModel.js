const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  tags: {
    type: [String],
    default: []
  },
  published : {
    type : Boolean,
    default : false
  },
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    body: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  viewCounts: { type: Number, default: 0 },
  views: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, timestamp: Date }],
  readTime: { type: Number, default: 0 },
  createdAt: {
    type: Date,
    default: Date.now
  }
});


blogSchema.methods.updateReadTime = async function(user, startTime, endTime) {
  const existingView = this.views.find(view => view.user.equals(user));
  if (existingView) {
    // user has already viewed the post, update the timestamp
    existingView.timestamp = endTime;
  } else {
    // user is viewing the post for the first time, add a new view
    this.viewCounts++;
    this.views.push({ user, timestamp: endTime });
  }
  // calculate the reading time
  const readingTime = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);
  // update the readTime property of the blog post
  this.readTime = (this.readTime + readingTime) / this.views.length;
  // save the changes to the database
  return this.save();
}
const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
