import { Pedido } from './Pedido';

/* Datos del objeto Carrito */

export interface Carrito{
    id: number,
    precio_total: number,
    pedidos:Pedido[],
    fecha_entrega:number,
}