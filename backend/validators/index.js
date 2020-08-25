const _get = require('lodash/get');
const requireDirectory = require('require-directory');
const validatorObjects = requireDirectory(module, './');
const { validationResult } = require('express-validator');

const validators = Object.keys(validatorObjects).reduce((acc, filename) => {
  acc[filename] = validatorObjects[filename];
  return acc;
}, {});

/**
 *
 * @param {string} type - path to validator. (e.g. 'users.getAll')
 */
const chooseAndValidate = type => async (req, res, next) => {
    try {
        await Promise.all(_get(validators, type).map(validation => validation.run(req)));
        const errors = validationResult(req);  

        if (errors.isEmpty()) {
        return next();
        }

        return res.status(400).json({ errors: errors.array() });

    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports = chooseAndValidate;