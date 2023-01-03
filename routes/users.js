import express from "express";

import {
  getUser,
  createUser,
  deleteUser,
  updateUser,
} from "../controllers/users.js";

const router = express.Router();

router.get("/", getUser);
router.post("/create", createUser);
router.delete("/delete/:userId", deleteUser);
router.patch("/update/:userId", updateUser);

export default router;
