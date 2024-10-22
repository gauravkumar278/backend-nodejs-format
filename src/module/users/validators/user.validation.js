const Joi = require('joi');
const { password, objectId } = require('./custom.validation');
const globalValidator = require('./../../../validators/validator');
const globalFunctions = require('../../../utils/globalFunctions');
const logger = require('../../../config/logger');

const createUser = (req, res, next) => {
    req.logAction = {
        uuid: req.uuid,
        apiModule: "users",
        apiHandler: "signup"
    };

    try {
        logger.info(req.logAction, { REQUEST_BODY: req.body });

        const schema = Joi.object().keys({
            email: Joi.string().required().email(),
            password: Joi.string().required().custom(password),
            name: Joi.string().required(),
            role: Joi.string().required().valid('USER', 'ADMIN'),
        });

        let validFields = globalValidator.validateSchema(req.body, res, schema);

        if (validFields) {
            next();
        }
    } catch (error) {
        logger.error(req.logAction, "User Signup validation Error", "ERROR" + ":" + error.message, "STACK" + ":" + error.stack);
        error.error_description = "User Signup validation";
        return globalFunctions.sendErrorResponse(error, res);
    }
};

module.exports = {
    createUser
};