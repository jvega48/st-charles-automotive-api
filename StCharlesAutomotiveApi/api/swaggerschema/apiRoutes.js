/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       properties:
 *         id:
 *           type: integer
 *         firstName:
 *            type: string
 *            minLength: 1
 *            maxLength: 10
 *         lastName:
 *            type: string
 *            minLength: 1
 *            maxLength: 10
 *         email:
 *            type: string
 *            required: true
 *            maxLength: 30
 *            uniqueItems: true
 *         address:
 *            type: string
 *            maxLength: 50
 *         phoneNumber:
 *            type: string
 *            minLength: 12
 *            maxLength: 18
 *         password:
 *            type: string
 *            required: true
 *            minLength: 8
 *     NewUser:
 *       properties:
 *         firstName:
 *            type: string
 *            minLength: 1
 *            maxLength: 10
 *         lastName:
 *            type: string
 *            minLength: 1
 *            maxLength: 10
 *         email:
 *            type: string
 *            required: true
 *            maxLength: 30
 *            uniqueItems: true
 *         address:
 *            type: string
 *            maxLength: 50
 *         password:
 *             type: string
 *             required: true
 *             minLength: 8
 *         phoneNumber:
 *            type: string
 *            minLength: 12
 *            maxLength: 18
 * @swagger
 * /api/v1/user:
 *  get:
 *    summary: Returns a list of users.
 *    description: Returns an array  of users.
 *    produces:
 *      - application/json
 *    tags:
 *         - User
 *    responses:
 *      200:
 *         description: Get a list of users
 *
 * @swagger
 * /api/v1/user:
 *  post:
 *    summary: Returns a new user
 *    description: Returns the newly created user.
 *    produces:
 *      - application/json
 *    requestBody:
 *      description: Object to create new user.
 *      content:
 *          'application/json':
 *              schema:
 *                  $ref: '#/components/schemas/NewUser'
 *    tags:
 *         - User
 *    response:
 *       200:
 *          description: Creates a new user
 * 
 * @swagger
 * /api/v1/user/email/{email}:
 *   get:
 *    summary: Returns a user based on the email.
 *    description: Returns the user with the matching email.
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: email
 *        type: string
 *        required: true
 *        description: Users email
 *    tags:
 *         - User
 *    responses:
 *      200:
 *        description: Returns user searched by email
 *
 * @swagger
 * /api/v1/user/{userId}:
 *   get:
 *    summary: Returns a user based on the userId.
 *    description: Returns the user with the matching userId.
 *    produces:
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: userId
 *        type: string
 *        required: true
 *        description: User id
 *    tags:
 *        - User
 *    responses:
 *      200:
 *        description: Return the user based on the userId passed.
 *
 * @swagger
 * /api/v1/user/{userId}:
 *  patch:
 *   summary: Returns the updated user based on the id.
 *   description: Returns the updated user with the matching userId.
 *   produces:
 *     - application/json
 *   parameters:
 *     - in: path
 *       name: userId
 *       type: string
 *       required: true
 *       description: User id
 *   tags:
 *      - User
 *   responses:
 *      200:
 *        description: Return the updated user.
 *
 * @swagger
 * /api/v1/user/{userId}:
 *  delete:
 *   summary: Deletes user based on the userId.
 *   description: Returns A successful message after deleting user.
 *   produces:
 *     - application/json
 *   parameters:
 *     - in: path
 *       name: userId
 *       type: string
 *       required: true
 *       description: User id
 *   tags:
 *      - User
 *   responses:
 *      200:
 *        description: Return success message after user deletion
 *
 *
 */