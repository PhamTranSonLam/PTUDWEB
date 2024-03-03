class ApiError extends Error {
    constructor(statuCode, message) {
        super();
        this.statusCode = StatusCode;
        this.message = message;
    }
}
module.exports = ApiError;