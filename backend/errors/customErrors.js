class customError extends Error{
    constructor(message, statusCode){
        super(message)
        this.statusCode = statusCode
    }
} 

export class notFoundError extends customError{
    constructor(message){
        super(message)
        this.statusCode = 404
    }
}

export class internalError extends customError{
    constructor(message){
        super(message)
        this.statusCode = 500
    }
}

export class badRequestError extends customError{
    constructor(message){
        super(message)
        this.statusCode = 400
    }
}

export class unauthorizedError extends customError{
    constructor(message){
        super(message)
        this.statusCode = 401
    }
}