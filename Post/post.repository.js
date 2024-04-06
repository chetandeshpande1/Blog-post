// // repositories/postRepository.js
// import Post from '../models/Post';

// export const getAllPosts = async () => {
//   try {
//     return await Post.findAll();
//   } catch (error) {
//     console.error(error);
//     throw new ApplicationError("Error occurred while fetching posts", 500);
//   }
// };

// export const createPost = async (title, content) => {
//   try {
//     return await Post.create({ title, content });
//   } catch (error) {
//     console.error(error);
//     throw new ApplicationError("Error occurred while creating post", 500);
//   }
// };

// export const deletePost = async (postId) => {
//   try {
//     const post = await Post.findByPk(postId);
//     if (!post) throw new ApplicationError("Post not found", 404);
//     await post.destroy();
//     return true;
//   } catch (error) {
//     console.error(error);
//     throw new ApplicationError("Error occurred while deleting post", 500);
//   }
// };

import { ObjectId } from 'mongodb';
import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error-handler/applicationError.js";

class PostRepository {
    constructor() {
        this.collection = "posts";
    }

    async add(newPost) {
        try {
            const db = getDB();
            const collection = db.collection(this.collection);
            await collection.insertOne(newPost);
            return newPost;
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong in DB", 500);
        }
    }

    async getAll() {
        try {
            const db = getDB();
            const collection = db.collection(this.collection);
            const posts = await collection.find().toArray();
            return posts;
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

    async update(id, updatedPost) {
        try {
            const db = getDB();
            const collection = db.collection(this.collection);
            await collection.updateOne({ _id: new ObjectId(id) }, { $set: updatedPost });
            return updatedPost;
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

export default PostRepository;
