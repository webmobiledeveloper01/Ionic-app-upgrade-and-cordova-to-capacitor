import { Producto } from './Producto';

/* Datos del objeto Pedido */

export interface Pedido{
    id?: number,
    nombre?: string,
    precio?:number,
    producto_id:number,
    cantidad:number,
    imagen:string
}