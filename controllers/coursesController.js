import Course from '../models/Course.js';
import Bootcamp from '../models/Bootcamp.js';
import ErrorResponse from '../utils/errorResponse.js';
import asyncHandler from '../middleware/asyncHandler.js';

// @desc      Get all courses
// @route     GET /api/v1/courses
// @route     GET /api/v1/bootcamps/:bootcampId/courses
// @access    Public
export const getCourses = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    const courses = await Course.find({ bootcamp: req.params.bootcampId });

    return res.status(200).json({
      success: true,
      count: courses.length,
      data: courses
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @desc      Get single course
// @route     GET /api/v1/courses/:id
// @route     GET /api/v1/bootcamps/:bootcampId/courses
// @access    Public
export const getCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id).populate({
    path: 'bootcamp',
    select: 'name description'
  });

  if (!course) {
    return next(
      new ErrorResponse(`Course that ends with '${req.params.id.slice(-6)}' was not found`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: course
  });
});

// @desc      Add a course
// @route     POST /api/v1/bootcamp/:bootcampId/courses
// @access    Private
export const addCourse = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;
  req.body.user = req.user.id;

  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp that ends with '${req.params.bootcampId.slice(-6)}' was not found`, 404)
    );
  }

  // Make sure user is bootcamp owner
  if (bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`User with ID that ends with '${req.user.id.slice(-6)}' is not authorized to add a course to this bootcamp`, 401));
  }


  let course = await Course.create(req.body);

  course = await Course.findById(course._id).populate({
    path: 'bootcamp',
    select: 'name description'
  });

  res.status(200).json({
    success: true,
    data: course
  });
});

// @desc      Update a course
// @route     PUT /api/v1/courses/:id
// @access    Private
export const updateCourse = asyncHandler(async (req, res, next) => {
  let course = await Course.findById(req.params.id);

  if (!course) {
    return next(
      new ErrorResponse(`Course that ends with '${req.params.id.slice(-6)}' was not found`, 404)
    );
  }

  // Make sure user is bootcamp owner
  if (course.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`User with ID that ends with '${req.user.id.slice(-6)}' is not authorized to update this course`, 401));
  }

  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: course
  });
});

// @desc      Delete a course
// @route     Delete /api/v1/courses/:id
// @access    Private
export const deleteCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(
      new ErrorResponse(`Course that ends with '${req.params.id.slice(-6)}' was not found`, 404)
    );
  }

  // Make sure user is bootcamp owner
  if (course.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`User with ID that ends with '${req.user.id.slice(-6)}' is not authorized to delete this course`, 401));
  }

  await course.deleteOne();

  res.status(200).json({
    success: true,
    data: {}
  });
});