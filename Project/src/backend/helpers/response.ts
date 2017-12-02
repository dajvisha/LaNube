export function CustomError(res: any, statusCode: number, errorMsg: string) {
    res.statusCode = statusCode;
    res.writeHead(statusCode, errorMsg, {'content-type' : 'text/plain'});
    // res.setHeader('Content-Type', 'application/json');
    // res.write(JSON.stringify({message: errorMsg}));
    res.end();
}

export function Success(res: any, objectType: ResponseObjectType, objectName: string, object?: any) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.write(responseObject(objectType, objectName, object));
    res.end();
}

export enum ResponseObjectType {
    Object,
    Array
}

function responseObject(type: ResponseObjectType, objectName: string, object?: any) {
    var data = {};
    data[objectName] = objectOrEmpty(type, object);
    return JSON.stringify(data);
}

function objectOrEmpty(type: ResponseObjectType, object?: any): any {
    if (object === null) {
        return type == ResponseObjectType.Array ? [] : {};
    }
    return object;
}