/* Datos del objeto Notification*/

export interface Notification{
    request_id: number;
    id: number,
    text:string,
    subtitle?:string,
    description?:string,
    title?:string,
    invite_id?:number,
}