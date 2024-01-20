
/* Datos del objeto Chat */

export interface Chat{
    id?: number,
    nombre?: string,
    urlImagen:string,
    descripcion:string,
    ultimo_mensaje:any,
    mensajes_nuevos:number
}