import express from "express";

import {
  getUsers,
} from "../controllers/userController.js";

const router = express.Router();

// ✅ Get All Users
router.get("/", getUsers);

export default router;