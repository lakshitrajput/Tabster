const express = require('express');
const { createGroup, getGroups, addToGroup, ungroup } = require('../Controller/groupController');
const { protect } = require('../middleware/authMiddleware');

const groupRouter = express.Router();

groupRouter.route('/')
.post(protect, createGroup)
.get(protect, getGroups)
.put(protect, addToGroup)
.delete(protect, ungroup)


module.exports = groupRouter;


