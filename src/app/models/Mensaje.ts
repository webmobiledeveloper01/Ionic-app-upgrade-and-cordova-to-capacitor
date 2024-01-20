/* Datos del objeto Mensaje */

export interface Mensaje{
    id?: number,
    texto?: string,
    created_at:any,
    user_name?:string,
    chat_id?:number,
    imagen?:string,
    avatar?:string,
    urlImagen?:string,
    visto?:boolean
}