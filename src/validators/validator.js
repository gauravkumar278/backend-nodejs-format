const globalFunctions = require('../utils/globalFunctions');

const validateSchema = (req, res, schema) => {
    const validation = schema.validate(req);
    if (validation.error) {
        let errorName = validation.error.name;
        let errorReason =
            validation.error.details !== undefined
                ? validation.error.details[0].message
                : 'Parameter missing or parameter type is wrong';
        globalFunctions.sendErrorResponse(new Error(errorName + ' ' + errorReason), res);
        return false;
    }
    return true;
}

module.exports = {
    validateSchema
}