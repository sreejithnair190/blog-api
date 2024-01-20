const express = require("express");
const blogController = require("./../controllers/blogController");
const { protect } = require("./../middlewares/authMiddleware");
const router = express.Router();

router
  .route("/")
  .all(protect)
  .get(blogController.getAllBlogs)
  .post(blogController.createBlog);

router
  .route("/:id")
  .all(protect)
  .get(blogController.getABlog)
  .put(blogController.updateBlog)
  .delete(blogController.deleteBlog);

module.exports = router;
