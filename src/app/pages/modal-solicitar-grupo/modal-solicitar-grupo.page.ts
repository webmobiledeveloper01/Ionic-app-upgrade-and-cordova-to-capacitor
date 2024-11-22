import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-solicitar-grupo',
  templateUrl: './modal-solicitar-grupo.page.html',
  styleUrls: ['./modal-solicitar-grupo.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class ModalSolicitarGrupoPage implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {}
  closeModal(value) {
    this.modalCtrl.dismiss(value);
  }
}
