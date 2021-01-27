"use strict";

const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");

router.get("/", orderController.index);

router.post("/", orderController.reservation);

module.exports = router;