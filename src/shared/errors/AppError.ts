class AppError {
    public readonly message: string
    public readonly statusCode: number

    constructor(message: string, statusCode: 400 | 404) {
        this.message = message
        this.statusCode = statusCode
    }
}

export default AppError
