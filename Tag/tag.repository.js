// // repositories/tagRepository.js
// import Tag from '../models/Tag';

// export const getAllTags = async () => {
//   try {
//     return await Tag.findAll();
//   } catch (error) {
//     console.error(error);
//     throw new Error("Error occurred while fetching tags");
//   }
// };

// export const createTag = async (tagName) => {
//   try {
//     return await Tag.create({ name: tagName });
//   } catch (error) {
//     console.error(error);
//     throw new Error("Error occurred while creating tag");
//   }
// };

// export const deleteTag = async (tagId) => {
//   try {
//     const tag = await Tag.findByPk(tagId);
//     if (!tag) throw new Error("Tag not found");
//     await tag.destroy();
//     return true;
//   } catch (error) {
//     console.error(error);
//     throw new Error("Error occurred while deleting tag");
//   }
// };




import { ObjectId } from 'mongodb';
import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

class TagRepository {
    constructor() {
        this.collection = "tags";
    }

    async add(newTag) {
        try {
            const db = getDB();
            const collection = db.collection(this.collection);
            await collection.insertOne(newTag);
            return newTag;
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong in DB", 500);
        }
    }

    async getAll() {
        try {
            const db = getDB();
            const collection = db.collection(this.collection);
            const tags = await collection.find().toArray();
            return tags;
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong in DB", 500);
        }
    }

    async get(id) {
        try {
            const db = getDB();
            const collection = db.collection(this.collection);
            return await collection.findOne({ _id: new ObjectId(id) });
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong in DB", 500);
        }
    }

    async update(id, updatedTag) {
        try {
            const db = getDB();
            const collection = db.collection(this.collection);
            await collection.updateOne({ _id: new ObjectId(id) }, { $set: updatedTag });
            return updatedTag;
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong in DB", 500);
        }
    }

    async delete(id) {
        try {
            const db = getDB();
            const collection = db.collection(this.collection);
            await collection.deleteOne({ _id: new ObjectId(id) });
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong in DB", 500);
        }
    }
}

export default TagRepository;
