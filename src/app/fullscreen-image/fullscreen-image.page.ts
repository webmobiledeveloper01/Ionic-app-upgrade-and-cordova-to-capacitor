// fullscreen-image.page.ts
import { ModalController } from '@ionic/angular';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-fullscreen-image',
  templateUrl: './fullscreen-image.page.html',
  styleUrls: ['./fullscreen-image.page.scss'],
})
export class FullscreenImagePage {
  @Input() imageUrl: string;

  constructor(private modalController: ModalController) {}

  close() {
    this.modalController.dismiss();
  }
}