import express from "express";
const router = express.Router();

import {
  loginController,
  signupController,
  logoutController,

} from "../Controllers/auth.controllers.js";

router.post("/login", loginController);
router.post("/signup", signupController);
router.get("/logout", logoutController);

export default router;