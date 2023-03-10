import express from "express";
import {getAllUsers,createadmin,deleteUser} from "../controllers/admin";
const securerouter = express.Router();

import { admin } from "../middleware/adminaccess";
import {getProfile,authenticat} from "../controllers/User_controller";

/**
 * @swagger
 * /admin/admin:
 *   post:
 *     tags:
 *       - User
 *     summary: Create admin
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/signup'
 *     responses:
 *       201:
 *         description: Successful user registration
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/signup'
 *       400:
 *         description: Bad Request
 */

securerouter.post("/admin", admin, createadmin);

/**
 * @swagger
 * /admin/users:
 *   get:
 *     tags:
 *       - User
 *     summary: Get all users
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/signup'
 *       401:
 *         description: Unauthorized
 */

securerouter.get("/users", admin, getAllUsers);

/**
 * @swagger
 * /admin/users/{userId}:
 *   delete:
 *     tags:
 *       - User
 *     summary: Delete a user
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The id of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Successfully deleted user
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: User not found
 */

securerouter.delete(
  "/users/:userId",
  // UserController.authenticat,
  admin,
  deleteUser
);

/**
 * @swagger
 * /admin/user/profile:
 *   get:
 *     tags:
 *       - User
 *     summary: Get user's profile information
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       "200":
 *         description: Successfully retrieved user's profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Response'
 *       "401":
 *         description: Unauthorized
 */

securerouter.get(
  "/user/profile",
  authenticat,
  getProfile
);

export default securerouter;
