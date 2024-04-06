// // Manage routes or Paths to ProductController

// // 1. import express 
// import  express  from "express";
// import UserController  from "./user.controller.js";


// // 2 Initialize Express router
// const userRouter = express.Router();

// const userController = new UserController();

// // userRouter.post('/signup', userController.signUp);
// userRouter.post('/signup', (res, req) => {
//     userController.signUp(res, req)
// })
// // userRouter.post('/signin', userController.signIn);
// userRouter.post('/signin', (res, req) => {
//     userController.signIn(res, req)
// })

// export default userRouter;

import express from "express";
import UserController from "./user.controller.js";

const userRouter = express.Router();
const userController = new UserController();

userRouter.post('/signup', (req, res) => {
    userController.signUp(req, res);
});

userRouter.post('/signin', (req, res) => {
    userController.signIn(req, res);
});

export default userRouter;
