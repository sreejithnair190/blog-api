const Comment = require("./../models/commentModel");
const AppError = require("./../utils/appError");
const { catchAsync, successMessage } = require("./../utils/utils");

exports.createComment = catchAsync(async (req, res) => {
  const { content } = req.body;
  const commentDetails = {
    content,
    blog_id: req.params.blogId * 1,
    user_id: req.user.id,
  };
  const comment = await Comment.create(commentDetails);
  successMessage(res, "Comment created successfully", 201, { comment });
});

exports.getAllComments = catchAsync(async (req, res) => {
  const comments = await Comment.findAll();
  successMessage(res, "Comment fetched successfully", 201, { comments });
});

exports.getAComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.findOne({ where: { id: req.params.id } });

  if (!comment) {
    return next(new AppError("Comment not found", 404));
  }

  successMessage(res, "Comment fetched successfully", 201, { comment });
});

exports.updateComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.findOne({ where: { id: req.params.id } });

  if (!comment) {
    return next(new AppError("Comment not found", 404));
  }

  if (comment.user_id !== req.user.id) {
    return next(new AppError("You cannot update this comment", 401));
  }

  const { title, content } = req.body;
  const updatedCommentDetails = { title, content, user_id: req.user.id };

  const result = await Comment.update(updatedCommentDetails, {
    where: { id: req.params.id },
  });
  const updatedComment = await Comment.findOne({
    where: { id: req.params.id },
  });

  successMessage(res, "Comment updated successfully", 201, {
    comment: updatedComment,
  });
});

exports.deleteComment = catchAsync(async (req, res, next) => {
  const comment = await Comment.findOne({ where: { id: req.params.id } });

  if (!comment) {
    return next(new AppError("Comment not found", 404));
  }

  if (comment.user_id !== req.user.id) {
    return next(new AppError("You cannot delete this comment", 401));
  }

  await comment.destroy();

  successMessage(res, "Comment deleted successfully");
});
