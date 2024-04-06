// // controllers/postController.js
// import { getAllPosts, createPost, deletePost } from '../Post/post.repository.js';

// export const getAllPostsController = async (req, res) => {
//   try {
//     const posts = await getAllPosts();
//     res.status(200).json(posts);
//   } catch (error) {
//     res.status(error.statusCode || 500).json({ error: error.message });
//   }
// };

// export const createPostController = async (req, res) => {
//   const { title, content } = req.body;
//   try {
//     const newPost = await createPost(title, content);
//     res.status(201).json(newPost);
//   } catch (error) {
//     res.status(error.statusCode || 500).json({ error: error.message });
//   }
// };

// export const deletePostController = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const isDeleted = await deletePost(id);
//     if (isDeleted) {
//       res.status(200).json({ message: "Post deleted successfully" });
//     } else {
//       res.status(404).json({ error: "Post not found" });
//     }
//   } catch (error) {
//     res.status(error.statusCode || 500).json({ error: error.message });
//   }
// };

// export const filterPostController = async (req, res) => {
        
//     try{
//         const title = req.query.title;
        
//         const result = await this.getAllPosts(title);
//         res.status(200).send(result);
//         }
//     catch(err){
//           console.log(err);
//           return res.status(200).send("Something went wrong in filtering post");
//     }
// }



import PostRepository from "./postRepository.js";

class PostController {
    constructor() {
        this.postRepository = new PostRepository();
    }

    async addPost(req, res) {
        try {
            const newPost = req.body;
            const createdPost = await this.postRepository.add(newPost);
            res.status(201).json(createdPost);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        }
    }

    async getAllPosts(req, res) {
        try {
            const posts = await this.postRepository.getAll();
            res.status(200).json(posts);
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        }
    }

    async getPost(req, res) {
        try {
            const postId = req.params.id;
            const post = await this.postRepository.get(postId);
            if (!post) {
                res.status(404).json({ message: "Post not found" });
            } else {
                res.status(200).json(post);
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        }
    }

    async updatePost(req, res) {
        try {
            const postId = req.params.id;
            const updatedPost = req.body;
            await this.postRepository.update(postId, updatedPost);
            res.status(200).json({ message: "Post updated successfully" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        }
    }

    async deletePost(req, res) {
        try {
            const postId = req.params.id;
            await this.postRepository.delete(postId);
            res.status(200).json({ message: "Post deleted successfully" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: "Something went wrong" });
        }
    }
}

export default PostController;
