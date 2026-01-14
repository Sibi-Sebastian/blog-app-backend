import express from 'express';
import { createBlogs, deleteBlog, getAllBlogs, getBlogById, updateBlog } from '../controllers/blogController.js';
import { validateTokenHandler } from '../middlewares/validateTokenHandler.js';

const blogRoute = express.Router();

blogRoute.use(validateTokenHandler);
blogRoute.get('/', getAllBlogs);
blogRoute.post('/', createBlogs);
blogRoute.get('/:id', getBlogById);
blogRoute.put('/:id', updateBlog);
blogRoute.delete('/:id', deleteBlog);

export default blogRoute;