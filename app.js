// // app.js
// import express from 'express'
// import router from './Tag/tag.routes';
// import postRouter from './Post/post.routes';
// import { ApplicationError } from './error-handler/applicationerror';


// const app = express();
// app.use(express.json());

// // Routes
// app.use('/api', authenticateUser, router);
// app.use('/api', authenticateUser, postRouter);

// // Error Handling Middleware
// app.use((err, req, res, next) => {
//   console.error(err);
//   if(err instanceof ApplicationError){
//     res.status(err.code).send(err.message)
// }
// // server errors
// res.status(500).send('Some went wrong please try later');
// });

// // Start Server
// app.listen(3200, () => {
//   console.log('Server is running on port 3200');
//   connectToMongoDB();
// });

import express from 'express';
import bodyParser from 'body-parser';
import PostRoutes from './postRoutes.js';
import TagRoutes from './routes/tagRoutes.js';
import { connectToDatabase } from './config/database.js';

const app = express();

// Middleware
app.use(bodyParser.json());

// Connect to database
connectToDatabase();

// Routes
server.use("/api/user", userRouter);
server.use("/api/post", loggerMiddleware, jwtAuth, postRouter);
server.use("/api/tag", loggerMiddleware, jwtAuth, tagRouter);

// Default route
server.get('/', (req, res) => {
    res.send("Welcome to the API");
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Start Server
app.listen(3200, () => {
  console.log('Server is running on port 3200');
  connectToMongoDB();
});