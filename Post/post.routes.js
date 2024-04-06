// // routes/postRoutes.js
// import express from 'express';
// import { getAllPostsController, createPostController, deletePostController } from '../controllers/postController';

// const postRouter = express.Router();

// postRouter.get('/posts', getAllPostsController);
// postRouter.post('/posts', createPostController);
// postRouter.delete('/posts/:id', deletePostController);

// export default postRouter;

import express from "express";
import PostController from "./post.controller.js";

const postRouter = express.Router();
const postController = new PostController();

postRouter.get('/', (req, res) => {
    postController.getAllPosts(req, res);
});

postRouter.post('/', (req, res) => {
    postController.createPost(req, res);
});

export default postRouter;

