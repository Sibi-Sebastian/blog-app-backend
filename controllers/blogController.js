import asyncHandler from 'express-async-handler';
import blogs from '../models/blogModel.js';

//@desc Get all blogs
//@api get blogs/
//@access PRIVATE

export const getAllBlogs = asyncHandler(async (req, res) => {

    const allBlogs = await blogs.find({user_id: req.user.id});
    res.status(200).json(allBlogs);
});

//@desc Create blogs
//@api post blogs/
//@access PRIVATE

export const createBlogs = asyncHandler(async (req, res) => {
    const {title, content} = req.body;
    
    if(!title || !content) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const newBlog = await blogs.create({user_id: req.user.id, title, content});
    res.status(201).json(newBlog);
});

//@desc Get Blog by id
//@api get blogs/:id
//@access PRIVATE

export const getBlogById = asyncHandler(async (req, res) => {

    const blogById = await blogs.findById(req.params.id);

    if(!blogById){
        res.status(404);
        throw new Error("Blog Not Found");
    }

    // Check if blog belongs to authenticated user
    if(blogById.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("Access denied");
    }
    res.status(200).json(blogById);
});

//@desc update blog by id
//@api put blogs/:id
//@access PRIVATE

export const updateBlog = asyncHandler(async (req, res) => {
    const {title, content} = req.body;
    
    if(!title || !content) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const blog = await blogs.findById(req.params.id);
    
    if(!blog){
        res.status(404);
        throw new Error("Blog not Found");
    }

    // Check if blog belongs to authenticated user
    if(blog.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("Access denied");
    }

    const updatedBlog = await blogs.findByIdAndUpdate(req.params.id, {title, content}, {new: true});

    res.status(200).json({updatedBlog});
});

//@desc Delete blogs
//@api delete blogs/:id
//@access PRIVATE

export const deleteBlog = asyncHandler(async (req, res) => {

    const blog = await blogs.findById(req.params.id);

    if(!blog){
        res.status(404);
        throw new Error("Blog Not Found");
    }

    // Check if blog belongs to authenticated user
    if(blog.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("Access denied");
    }

    const deletedBlog = await blogs.findByIdAndDelete(req.params.id);

    res.status(200).json({
        message: "Blog Deleted Successfully",
        blog: deletedBlog});
});