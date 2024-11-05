const express = require('express');
const { createGroup, getGroups, addToGroup } = require('../Controller/groupController');
const { protect } = require('../middleware/authMiddleware');

const groupRouter = express.Router();

groupRouter.route('/')
.post(protect, createGroup)
.get(protect, getGroups)
.put(protect, addToGroup)


module.exports = groupRouter;


