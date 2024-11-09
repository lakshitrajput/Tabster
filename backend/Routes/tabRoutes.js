const express = require('express');
const { updateTabId } = require('../Controller/tabController');

const tabRouter = express.Router();

tabRouter.route('/')
.put(updateTabId);


module.exports = tabRouter;