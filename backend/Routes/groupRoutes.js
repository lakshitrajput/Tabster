const express = require('express');
const { createGroup, getGroups } = require('../Controller/groupController');
const { protect } = require('../middleware/authMiddleware');

const groupRouter = express.Router();

groupRouter.route('/')
.post(protect, createGroup)
.get(protect, getGroups)


module.exports = groupRouter;


