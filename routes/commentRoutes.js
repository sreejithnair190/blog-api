const express = require("express");
const commentController = require("./../controllers/commentController");
const { protect } = require("./../middlewares/authMiddleware");
const router = express.Router();

router
  .route("/blogs/:blogId")
  .all(protect)
  .get(commentController.getAllComments)
  .post(commentController.createComment);

router
  .route("/:id")
  .all(protect)
  .get(commentController.getAComment)
  .put(commentController.updateComment)
  .delete(commentController.deleteComment);

module.exports = router;
