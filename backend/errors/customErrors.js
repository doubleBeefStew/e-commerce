class customError extends Error{
    constructor(message, statusCode, errorCode){
        super(message)
        this.statusCode = statusCode
        this.errorCode = errorCode
    }
} 

export class notFoundError extends customError{
    constructor(message,errorCode){
        super(message)
        this.statusCode = 404
        this.errorCode = errorCode
    }
}

export class internalError extends customError{
    constructor(message,errorCode){
        super(message)
        this.statusCode = 500
        this.errorCode = errorCode
    }
}

export class badRequestError extends customError{
    constructor(message,errorCode){
        super(message)
        this.statusCode = 400
        this.errorCode = errorCode
    }
}

export class unauthorizedError extends customError{
    constructor(message,errorCode){
        super(message)
        this.statusCode = 401
        this.errorCode = errorCode
    }
}