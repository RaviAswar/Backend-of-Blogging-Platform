const { Post, User } = require('../models/index');

const postController = {
  getAllPosts: async (req, res) => {
    try {
      const posts = await Post.findAll({
        include: [{ model: User, attributes: ['id', 'username'] }],
        order: [['createdAt', 'DESC']]
      });
      res.json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error while fetching posts' });
    }
  },
  
  getPostById: async (req, res) => {
    try {
      const post = await Post.findByPk(req.params.id, {
        include: [{ model: User, attributes: ['id', 'username'] }]
      });
      
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      
      res.json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error while fetching post' });
    }
  },
  
  createPost: async (req, res) => {
    try {
      const { title, content } = req.body;
      const userId = req.user.id;
      
      const post = await Post.create({ title, content, userId });
      res.status(201).json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error while creating post' });
    }
  },
  
  updatePost: async (req, res) => {
    try {
      const { title, content } = req.body;
      const postId = req.params.id;
      const userId = req.user.id;
      
      const post = await Post.findOne({ where: { id: postId, userId } });
      
      if (!post) {
        return res.status(404).json({ message: 'Post not found or unauthorized' });
      }
      
      post.title = title || post.title;
      post.content = content || post.content;
      await post.save();
      
      res.json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error while updating post' });
    }
  },
  
  deletePost: async (req, res) => {
    try {
      const postId = req.params.id;
      const userId = req.user.id;
      
      const post = await Post.findOne({ where: { id: postId, userId } });
      
      if (!post) {
        return res.status(404).json({ message: 'Post not found or unauthorized' });
      }
      
      await post.destroy();
      res.json({ message: 'Post deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error while deleting post' });
    }
  },
  
  getUserPosts: async (req, res) => {
    try {
      const userId = req.user.id;
      const posts = await Post.findAll({
        where: { userId },
        order: [['createdAt', 'DESC']]
      });
      res.json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error while fetching user posts' });
    }
  }
};

module.exports = postController;