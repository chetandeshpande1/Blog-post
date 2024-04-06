



import express from "express";
import TagController from "./tag.controller.js";

const tagRouter = express.Router();
const tagController = new TagController();

tagRouter.get('/', (req, res) => {
    tagController.getAllTags(req, res);
});

tagRouter.post('/', (req, res) => {
    tagController.createTag(req, res);
});

export default tagRouter;






















// import express from 'express';
// import TagController from './tagController.js';

// const router = express.Router();
// const tagController = new TagController();

// router.post('/', tagController.addTag.bind(tagController));
// router.get('/', tagController.getAllTags.bind(tagController));
// router.get('/:id', tagController.getTag.bind(tagController));
// router.put('/:id', tagController.updateTag.bind(tagController));
// router.delete('/:id', tagController.deleteTag.bind(tagController));

// export default router;
