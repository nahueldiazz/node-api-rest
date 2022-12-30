const {check} = require('express-validator')
const validateResults = require('../utils/handleValidators')

const validatorResgisterItem = [
  check('name').exists().notEmpty().isLength({min: 3, max:99}),
  check('age').exists().notEmpty(),
  check('password').exists().notEmpty().isLength({min: 3, max:15}),
  check('email').exists().notEmpty().isEmail(),

  (req, res, next) => {
    return validateResults(req,res,next)
  }
]

const validatorLoguinItem = [
  check('password').exists().notEmpty().isLength({min: 3, max:15}),
  check('email').exists().notEmpty().isEmail(),

  (req, res, next) => {
    return validateResults(req,res,next)
  }
]

module.exports = {validatorResgisterItem, validatorLoguinItem}