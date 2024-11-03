const express = require('express');
const { postBookmark } = require('../Controller/tabController');

const tabRouter = express.Router();

tabRouter.route('/bookmark')
.post(postBookmark);


module.exports = tabRouter;