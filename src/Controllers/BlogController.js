const BlogModel = require('../Models/BlogModel/blogModel');
const { sendResponse } = require('../services/helperServices')
const User = require('../Models/Auth/UserModel');

class BlogController {
    constructor() {

    }
    async createBlog(req, res) {
        try {
            const { title, body,tags,category,published } = req.body;
            const blog = await BlogModel.create({
                title, body,tags,category,published, 
                author : req.user._id,

            })
                res.status(200).json(blog)

        } catch (error) {
            res.status(500).json(error.message)
        }
    }
    async blogLike(req, res) {
        try {
            const { blogId } = req.body;

            const blog = await BlogModel.findOne(blogId)
            if(!blog){
                throw new Error("Blog is not found")
            }
            let check = await blog.likes.includes(req.user._id)
            if(check){
            res.status(200).json({msg : " You already liked this blog"})
            }else{
                await blog.likes.push(req.user._id)
                await blog.save()
                res.status(200).json({msg : " like"})
            }

        } catch (error) {
            res.status(500).json(error.message)
        }
    }
    async blogComments(req, res) {
        try {
            const {  body } = req.body;

            const blog = await BlogModel.findOne({
                _id  : req.params.id
            })
            if(!blog){
                throw new Error("Blog is not found")
            }
            let comments = {
                body : body,
                user : req.user._id
            }
                await blog.comments.push(comments)
                await blog.save()
                res.status(200).json({msg : "comment add to this post"})

        } catch (error) {
            res.status(500).json(error.message)
        }
    }
    async blogViews(req, res) {
        try {

            const blog = await BlogModel.findOne({
                _id  : req.params.id
            })
            if(!blog){
                throw new Error("Blog is not found")
            }
            const startTime = new Date();
            await blog.updateReadTime(req.user._id, startTime, startTime);
            return sendResponse(res, 200, blog);

        } catch (error) {
            res.status(500).json(error.message)
        }
    }
}
const Blog = new BlogController();
module.exports = Blog