# Node.js RESTful API

This RESTful API is built with Node.js, Express.js, and MongoDB, featuring various functionalities, including user authentication, CRUD operations, pagination, filtering, sorting, and geocoding. 

It allows image uploading, searching for bootcamps by distance, and advanced filtering. Security measures include middleware for error handling, and authentication. 

This API offers a rich set of endpoints to manage bootcamps, courses, reviews, and users. For instance, the API allows creating, retrieving, updating, and deleting bootcamps, courses, reviews, and users based on different access levels. The API offers a wide range of access levels, including public, private for authenticated users and secured for publishers and admins. The API supports pagination, filtering, and sorting for bootcamps, courses, and reviews. Additionally, the API provides functionality to search for bootcamps within a certain radius, as well as to upload bootcamp images.

## Getting Started
To get started, you'll need Node.js installed on your local machine and a MongoDB Atlas account. You'll also need a config.env file with the required environment variables.

### Environment Variables
Create a config.env file in the config folder and add the following environment variables:

```
NODE_ENV=development
PORT=5000

MONGO_URI=your_mongodb_connection_string

GEOCODER_PROVIDER=your_geocoder_provider
GEOCODER_API_KEY=your_geocoder_api_key

FILE_UPLOAD_PATH= ./public/uploads
UPLOADS_FOLDER= /uploads
MAX_FILE_SIZE=1000000

JWT_SECRET=your_jwt_secret
JWT_EXPIRE=30d
JWT_COOKIE_EXPIRE=30

SMTP_HOST=sandbox.smtp.mailtrap.io
SMTP_PORT=2525
SMTP_EMAIL=your_smtp_email
SMTP_PASSWORD=your_smtp_password
FROM_EMAIL=noreply@bootcamper.com
FROM_NAME=Bootcamper
```


## Dependencies

#### Node.js
* nodemon (dev dependency)
  
#### Express.js

* express
* cookie-parser
* express-fileupload

#### Security
* express-mongo-sanitize
* express-rate-limit
* cors
* helmet
* hpp
* xss-clean


#### MongoDB

* mongoose

#### Auth

* bcryptjs
* jsonwebtoken
  
#### Geo Coding

* node-geocoder
  
#### File Upload

* express-fileupload
  
#### Utils

* morgan
* dotenv
* slugify
* nodemailer
* colors (dev dependency)

### Installing Dependencies
Install the required dependencies by running the following command:

```bash
npm install
```

### Starting the Server
Start the server by running:

```bash
npm run dev
```

## API Endpoints
The API provides the following endpoints:

### Authentication
* User registration: `POST /api/v1/auth/register` (public)
* User login: `POST /api/v1/auth/login` (public)
* User logout: `GET /api/v1/auth/logout` (private - requires authentication)
* Get current logged-in user: `GET /api/v1/auth/current-user` (private - requires authentication)
* Forgot password: `POST /api/v1/auth/forgot-password` (public)
* Reset password: `PUT /api/v1/auth/reset-password/:resettoken` (public)
* Update details: `PUT /api/v1/auth/update-details` (private - requires authentication)
* Update password: `PUT /api/v1/auth/update-password` (private - requires authentication)

### Bootcamps

* Get all bootcamps: `GET /api/v1/bootcamps` (public - with pagination and filtering)
* Get single bootcamp: `GET /api/v1/bootcamps/:id` (public)
* Create bootcamp: `POST /api/v1/bootcamps` (private - publisher/admin)
* Update bootcamp: `PUT /api/v1/bootcamps/:id` (private - publisher/admin)
* Delete bootcamp: `DELETE /api/v1/bootcamps/:id` (private - publisher/admin)
* Get bootcamps within a radius: `GET /api/v1/bootcamps/radius/:zipcode/:distance` (public)
* Upload bootcamp image: `PUT /api/v1/bootcamps/:id/image` (private - publisher/admin)

### Courses

* Get all courses: `GET /api/v1/courses` (public)
* Get courses for a specific bootcamp: `GET /api/v1/bootcamps/:bootcampId/courses` (public)
* Get single course: `GET /api/v1/courses/:id` (public)
* Create course: `POST /api/v1/bootcamps/:bootcampId/courses` (private - publisher/admin)
* Update course: `PUT /api/v1/courses/:id` (private - publisher/admin)
* Delete course: `DELETE /api/v1/courses/:id` (private - publisher/admin)
### Reviews

* Get all reviews: `GET /api/v1/reviews` (public)
* Get a single review by ID: `GET /api/v1/reviews/:id` (public)
* Create a new review for a bootcamp: `POST /api/v1/bootcamps/:bootcampId/reviews` (private - requires authentication)
* Update a review: `PUT /api/v1/reviews/:id` (private - requires authentication)
* Delete a review: `DELETE /api/v1/reviews/:id` (private - requires authentication)

### Users

* Get all users: `GET /api/v1/users` (private - admin)
* Get a single user: `GET /api/v1/users/:id` (private - admin)
* Create a user: `POST /api/v1/users` (private - admin)
* Update a user: `PUT /api/v1/users/:id` (private - admin)
* Delete a user: `DELETE /api/v1/users/:id` (private - admin)


## Features

* User authentication and authorization
* Password reset functionality (with email sending)
* CRUD operations on resources
* Pagination, filtering, and sorting of results
* Middleware for error handling
* Geocoding of addresses

## Pagination, Filtering, and Sorting
The API supports pagination, filtering, and sorting for bootcamps, courses, and reviews.

### Pagination

Specify the page number and limit per page: GET /api/v1/bootcamps?page=1&limit=10

### Filtering

Filter results by specific fields: GET /api/v1/bootcamps?housing=true
Use comparison operators to filter results: GET /api/v1/bootcamps?averageCost[lte]=10000

### Sorting

Sort results by one or more fields: GET /api/v1/bootcamps?sort=name,averageCost
Sort results in descending order: GET /api/v1/bootcamps?sort=-averageCost

## Middleware

This project utilizes various middleware for tasks such as error handling, authentication, and authorization:

* `middleware/advancedResults.js`: for advanced filtering, sorting, and pagination
* `middleware/asyncHandler.js`: for handling async/await functions in Express routes
* `middleware/authMiddleware.js`: for protecting routes and authorizing user roles
* `middleware/errorHandler.js`: for handling errors and sending appropriate responses


* `utils/ErrorResponse.js`: for creating custom error responses
* `utils/sendEmail.js`: for sending password reset emails
* `utils/sendTokenResponse.js`: for setting JWT tokens and sending as response
* `utils/geoCoder.js`: for converting addresses to coordinates using Node-geocoder
  
## License
This project is licensed under the MIT License.