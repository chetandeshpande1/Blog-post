// // controllers/tagController.js
// import { getAllTags, createTag, deleteTag } from '../repositories/tagRepository';

// export const getAllTagsController = async (req, res) => {
//   try {
//     const tags = await getAllTags();
//     res.status(200).json(tags);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export const createTagController = async (req, res) => {
//   const { name } = req.body;
//   try {
//     const newTag = await createTag(name);
//     res.status(201).json(newTag);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export const deleteTagController = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const isDeleted = await deleteTag(id);
//     if (isDeleted) {
//       res.status(200).json({ message: "Tag deleted successfully" });
//     } else {
//       res.status(404).json({ error: "Tag not found" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };




import TagRepository from ".Tag/tag.repository.js";

class TagController {
    constructor() {
        this.tagRepository = new TagRepository();
    }

    async addTag(req, res) {
        try {
            const newTag = req.body;
            const createdTag = await this.tagRepository.add(newTag);
            res.status(201).json(createdTag);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        }
    }

    async getAllTags(req, res) {
        try {
            const tags = await this.tagRepository.getAll();
            res.status(200).json(tags);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        }
    }

    async getTag(req, res) {
        try {
            const tagId = req.params.id;
            const tag = await this.tagRepository.get(tagId);
            if (!tag) {
                res.status(404).json({ message: "Tag not found" });
            } else {
                res.status(200).json(tag);
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        }
    }

    async updateTag(req, res) {
        try {
            const tagId = req.params.id;
            const updatedTag = req.body;
            await this.tagRepository.update(tagId, updatedTag);
            res.status(200).json({ message: "Tag updated successfully" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        }
    }

    async deleteTag(req, res) {
        try {
            const tagId = req.params.id;
            await this.tagRepository.delete(tagId);
            res.status(200).json({ message: "Tag deleted successfully" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        }
    }
}

export default TagController;
