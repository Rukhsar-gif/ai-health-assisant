// const express = require("express");
// const router = express.Router();

// const {
//   getAnalytics,
// } = require("../controllers/analyticsController");

// router.get("/", getAnalytics);

// module.exports = router;


import express from "express";
import { getAnalytics } from "../controllers/analyticsController.js";

const router = express.Router();

router.get("/", getAnalytics);

export default router;