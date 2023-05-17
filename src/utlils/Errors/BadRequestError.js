import ApplicationError from "./ApplicationError.js";

class BadRequestError extends ApplicationError{
    constructor(message){
        super(400, message);
    }
}

export default BadRequestError;