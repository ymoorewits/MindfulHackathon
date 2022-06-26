export class Response {
    statusCode: number;
    data: object;
    message: string;

    constructor(statusCode: number = 200, data: object = {}, message: string = "") {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
    }
}
