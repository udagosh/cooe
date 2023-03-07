import getTimeStamp from "./timestamp.js";
class ExpressError extends Error{
    constructor(message, statusCode, cause=undefined){
        super();
        this.message= message;
        this.statusCode = statusCode;
        this.cause = cause
    }

    logCause(){
        console.error(cause)
    }

    logError(){
        console.error(`${getTimeStamp()} ${this.message} ${this.statusCode}`)
    }
}

export default ExpressError;