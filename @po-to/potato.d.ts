import * as http from 'http';

export interface IHttpRequest extends http.IncomingMessage{
    body : {[key:string]:any},
    routing : {controller:string, action:string, path:string, args:any}
}
export interface IRequest{
    parent: IRequest;
    controller: string;
    action: string;
    path?: string;
    args:{ [key: string]: any };
    beCache:boolean;
    url?:string;
    toUrl(toAmd?:boolean, noArgs?:boolean): string;
    getCore():ICore;
    getRoot():IRequest;
    setResponse(data:any);
    setHeader(name:string,value:string|string[]);

}

export interface IAMD{
    id:string;
    dependencies:IRequest|string|any[];
    callback:Function|any;    
}
export interface IApiRequest {
    context: IRequest;
    url: string;
    method?: string;
    data?: { [key: string]: any } | string;
    headers?: { [key: string]: string };
    render?: (data: any) => any
}
export interface IController {
    Item?(request: IRequest, args: any, resolve: (data: any) => void, reject: (error: Error) => void);
    Update?(request: IRequest, args: any, resolve: (data: any) => void, reject: (error: Error) => void);
    Create?(request: IRequest, args: any, resolve: (data: any) => void, reject: (error: Error) => void);
    Delete?(request: IRequest, args: any, resolve: (data: any) => void, reject: (error: Error) => void);
    ItemList?(request: IRequest, args: any, resolve: (data: any) => void, reject: (error: Error) => void);
    UpdateList?(request: IRequest, args: any, resolve: (data: any) => void, reject: (error: Error) => void);
    CreateList?(request: IRequest, args: any, resolve: (data: any) => void, reject: (error: Error) => void);
    DeleteList?(request: IRequest, args: any, resolve: (data: any) => void, reject: (error: Error) => void);
}

export interface ICore {
    routing(str: string, method: string, data?: any): {controller:string, action:string, path:string, args:any} | null;
    hasController(path: string, isInternal: boolean): boolean;
    hasAction(controller: string, action: string, isInternal: boolean): boolean;
    getController(path: string, isInternal: boolean): IController | null;
    checkPermission(request: IRequest): boolean;
    entrance(req: IHttpRequest, res: http.ServerResponse,  resolve: (data:any) => void, reject: (error: Error) => void);
    executeRequest<T>(request: IRequest, internal:boolean, success?: (data:T) => void, failure?: (error: Error) => void);
    executeRequestToData<T>(request: IRequest, internal:boolean, toAmd:boolean, success?: (data:T) => void, failure?: (error: Error) => void);
    toUrl(request: IRequest, toAmd?:boolean, noArgs?:boolean): string;
    callApi<T>(requestOptions: IApiRequest, succss?: (data: T) => void, fail?: (error: Error) => void)
}
