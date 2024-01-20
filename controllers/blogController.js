const Blog = require("./../models/blogModel");
const AppError = require("./../utils/appError");
const { catchAsync, successMessage } = require("./../utils/utils");

exports.createBlog = catchAsync(async (req, res) => {
  const { title, content } = req.body;
  const blogDetails = { title, content, user_id: req.user.id };
  const blog = await Blog.create(blogDetails);
  successMessage(res, "Blog created successfully", 201, { blog });
});

exports.getAllBlogs = catchAsync(async (req, res) => {
  const blogs = await Blog.findAll();
  successMessage(res, "Blog fetched successfully", 201, { blogs });
});

exports.getABlog = catchAsync(async (req, res, next) => {
  const blog = await Blog.findOne({ where: { id: req.params.id } });

  if (!blog) {
    return next(new AppError("Blog not found", 404));
  }

  successMessage(res, "Blog fetched successfully", 201, { blog });
});

exports.updateBlog = catchAsync(async (req, res, next) => {
  const blog = await Blog.findOne({ where: { id: req.params.id } });

  if (!blog) {
    return next(new AppError("Blog not found", 404));
  }

  if (blog.user_id !== req.user.id ) {
    return next(new AppError("You cannot update this blog", 401));
  }

  const { title, content } = req.body;
  const updatedBlogDetails = { title, content, user_id: req.user.id };

  const result = await Blog.update(updatedBlogDetails, {
    where: { id: req.params.id },
  });
  const updatedBlog = await Blog.findOne({ where: { id: req.params.id } });

  successMessage(res, "Blog updated successfully", 201, { blog:updatedBlog });
});

exports.deleteBlog = catchAsync(async (req, res, next) => {
  const blog = await Blog.findOne({ where: { id: req.params.id } });

  if (!blog) {
    return next(new AppError("Blog not found", 404));
  }

  if (blog.user_id !== req.user.id ) {
    return next(new AppError("You cannot delete this blog", 401));
  }

  await blog.destroy();

  successMessage(res, "Blog deleted successfully");
});
