
const httpErrors = require('http-errors');
const validation = (schema, property) => {
    return async (req, res, next) => {
        const { error, value } = schema.validate(req[property]);
        if (error) {
            next(httpErrors.BadRequest(`Validation error: ${error.details.map(x => x.message).join(', ')}`));
        } else {
            next();
        }
    }
}
module.exports = { validation };