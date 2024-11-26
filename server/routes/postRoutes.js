// routes/posts.js
const express = require('express');
const { createPost, fetchPosts, addComment, toggleLike, deletePost, updatePost, editComment, deleteComment } = require('../controllers/postController');

const router = express.Router();

router.post('/', createPost);
router.post('/:postId/comment', addComment); 
router.post('/:postId/like', toggleLike);

router.get('/getposts', fetchPosts);
 

router.delete('/:postId', deletePost);
router.put('/:postId', updatePost);

router.put('/:postId/comment/:commentId', editComment);
router.delete('/:postId/comment/:commentId', deleteComment);



module.exports = router;
