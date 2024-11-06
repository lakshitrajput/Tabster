const express = require('express');
const { createGroup, getGroups, addToGroup, ungroup, removeTabFromGroup } = require('../Controller/groupController');
const { protect } = require('../middleware/authMiddleware');

const groupRouter = express.Router();

groupRouter.route('/')
.post(protect, createGroup)
.get(protect, getGroups)
.put(protect, addToGroup)
.delete(protect, ungroup);

groupRouter.route('/remove')
.put(removeTabFromGroup);


module.exports = groupRouter;


