const { validationResult } = require("express-validator")
const { errorResponse } = require("../controllers/responseController")

const runValidation = async (req, res, next) => {
    try {

        const errors = await validationResult(req)

        if(!errors.isEmpty()) {
            return errorResponse(res, {
                statusCode: 400,
                message : errors.array()[0].msg
            })
        }

        return next()
        
    } catch (error) {
        next(error)
    }
}

module.exports = runValidation