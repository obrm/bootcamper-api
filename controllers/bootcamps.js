
// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
export const getBootcamps = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Show all bootcamps' });
};

// @desc    Get single bootcamp
// @route   GET /api/v1/bootcamps/:id
// @access  Public
export const getBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Get a single bootcamp' });
};

// @desc    Create a bootcamp
// @route   POST /api/v1/bootcamps
// @access  Private
export const createBootcamp = (req, res, next) => {
  res.status(201).json({ success: true, msg: 'Create a bootcamp' });
};

// @desc    Update a bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Private
export const updateBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Update a bootcamp' });
};

// @desc    Delete a bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  Private
export const deleteBootcamp = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Delete a bootcamp' });
};