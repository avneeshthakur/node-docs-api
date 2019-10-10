var express = require('express');
var router = express.Router();
const Joi = require('@hapi/joi')
const validator = require('express-joi-validation').createValidator({})
const { signupController, loginController } = require('../controllers/user-controller');

const signupSchema = Joi.object({
  userName: Joi.string().required(),
  email:Joi.string().email().required(),
  password:Joi.string().length(8).required()
});

const loginSchema = Joi.object({
  email:Joi.string().email().required(),
  password:Joi.string().length(8).required()
});

/* signup user. */
router.post('/signup', validator.body(signupSchema), signupController);

/* login user. */
router.post('/login', validator.body(loginSchema), loginController);



module.exports = router;
