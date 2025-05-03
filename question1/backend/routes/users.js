import express from "express";
import { getTopUsers } from "../controllers/users.js";

const router = express.Router();

router.get("/", getTopUsers);

export default router;
