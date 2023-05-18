class Helper {
    constructor() {
        // Initialize any required dependencies or state here
    }
    sendResponse(res, statusCode, resultValue) {
        res.status(statusCode).json(resultValue)
    }

}
const helperServices = new Helper()
module.exports = helperServices;
