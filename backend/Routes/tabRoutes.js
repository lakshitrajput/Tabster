const express = require('express');
const { updateTabId, getAnalysis, sendAnalysis } = require('../Controller/tabController');
const { protect } = require('../middleware/authMiddleware');

const tabRouter = express.Router();

tabRouter.route('/')
.put(updateTabId);

tabRouter.route('/usage')
.post(protect, getAnalysis)
.get(protect, sendAnalysis);


module.exports = tabRouter;