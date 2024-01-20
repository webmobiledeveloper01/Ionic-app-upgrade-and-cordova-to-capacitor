import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Pedido } from '../models/Pedido';
import { AlertController } from '@ionic/angular';
import { ApiService } from './api.service';
import { Carrito } from '../models/Carrito';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: Carrito;
  private cartItemCount = new BehaviorSubject<number>(0);
  public carritoChanges = new Subject<Carrito>();

  constructor(private alertCtrl: AlertController, private apiService: ApiService) {

    this.cart = {
      id: 1,
      precio_total: 0,
      pedidos: [],
      fecha_entrega: null,
    }
  }

  public getPedidos(): Pedido[] {
    return this.cart.pedidos;
  }

  public getCarrito() {
    return this.cart;
  }

  public getCartItemCount() {
    return this.cartItemCount;
  }

  public addPedido(pedido: Pedido): void {
    let added = false;
    for (let p of this.cart.pedidos) {
      if (p.producto_id === pedido.producto_id) {
        p.cantidad += 1;
        added = true;
        break;
      }
    }

    if (!added) {
      console.log("pusheado");

      this.cart.pedidos.push(pedido);
    }

    this.cart.precio_total += Number(pedido.precio);

    this.cartItemCount.next(this.cartItemCount.value + 1);

  }

  public async decreasePedido(pedido: Pedido) {
    for (let [index, p] of this.cart.pedidos.entries()) {
      if (p.producto_id === pedido.producto_id) {
        if (p.cantidad == 1) {
          const alert = await this.alertCtrl.create({
            header: 'Borrar producto',
            message: '¿Quieres eliminar el producto del carrito?',
            buttons: [
              {
                text: 'Cancelar',
                role: 'cancel',
                handler: () => {
                }
              }, {
                text: 'Aceptar',
                handler: () => {
                  this.cart.pedidos.splice(index, 1);

                  this.cart.precio_total -= Number(pedido.precio);

                  this.cartItemCount.next(this.cartItemCount.value - 1);

                }
              }
            ]
          });

          await alert.present();

        } else {

          p.cantidad -= 1;
          this.cart.precio_total -= Number(pedido.precio);
          this.cartItemCount.next(this.cartItemCount.value - 1);
        }
      }
    }

  }

  public async borrarPedido(pedido: Pedido) {
    for (let [index, p] of this.cart.pedidos.entries()) {
      if (p.producto_id === pedido.producto_id) {
        const alert = await this.alertCtrl.create({
          header: 'Borrar producto',
          message: '¿Quieres eliminar el producto del carrito?',
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel',
              handler: () => {
              }
            }, {
              text: 'Aceptar',
              handler: () => {
                this.cart.pedidos.splice(index, 1);

                this.cart.precio_total -= Number(pedido.precio) * pedido.cantidad;

                this.cartItemCount.next(this.cartItemCount.value - pedido.cantidad);

              }
            }
          ]
        });

        await alert.present();

      }
    }
  }


  public clearCart(): void {
    this.cart = {
      id: 1,
      precio_total: 0,
      pedidos: [],
      fecha_entrega: null
    };
    this.cartItemCount.next(0);
  }
}