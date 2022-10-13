const express = require('express');

const router = express.Router();

const { userUpdateValidate } = require('../midllewares/validation');

const {
  userUpdate,
  getUserMe,
} = require('../controllers/users');

router.get('/me', getUserMe);

router.patch('/me', userUpdateValidate, userUpdate);

module.exports = router;
