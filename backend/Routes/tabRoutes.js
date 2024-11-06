const express = require('express');
const { postBookmark, updateTabId } = require('../Controller/tabController');

const tabRouter = express.Router();

tabRouter.route('/bookmark')
.post(postBookmark);

tabRouter.route('/')
.put(updateTabId);


module.exports = tabRouter;