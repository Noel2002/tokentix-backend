class ApplicationError extends Error{
    constructor(status, message){
        super(message);
        this.message = message || "Something went wrong. Please try again!";
        this.status = status || 500;

        Error.captureStackTrace(this, this.constructor);

    }
}
export default ApplicationError;