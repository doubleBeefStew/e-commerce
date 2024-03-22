interface responseSchema {
    error:{
        message:string,
        code: string
    },
    output:{
        message:string,
        payload:{}
    }
}

export default responseSchema