const globalFunctions = require('../../../utils/globalFunctions');
const logger = require('../../../config/logger');

const createUser = (req, res) => {
    try {
        let data = req.body;
        globalFunctions.sendSuccessResponse({ data: data }, res);
    } catch (error) {
        logger.error(req.logAction, "User Signup Error", "ERROR" + ":" + error.message, "STACK" + ":" + error.stack);
        error.error_description = "User Signup Controller";
        globalFunctions.sendErrorResponse(error, res);
    }
}

module.exports = {
    createUser
}