import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';


@Component({
  selector: 'app-geoask-pregunta-en-el-mapa',
  templateUrl: './geoask-pregunta-en-el-mapa.page.html',
  styleUrls: ['./geoask-pregunta-en-el-mapa.page.scss'],
})
export class GeoaskPreguntaEnElMapaPage implements OnInit {
  

  constructor(private navController: NavController) {
    
  }

  ngOnInit() {
  }

  adjuntarImagen(){
    console.log("TODO: Balkishan:  Method was not implemented in Component.");
  }

  back(){
    console.log("TODO: Method was not implemented. Added Placeholder");
    this.navController.back(); // HotFix: Need to confirm the behaviour 
  }
}

