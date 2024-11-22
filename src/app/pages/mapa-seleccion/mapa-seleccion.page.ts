import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Geolocation } from '@capacitor/geolocation';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-mapa-seleccion',
  templateUrl: './mapa-seleccion.page.html',
  styleUrls: ['./mapa-seleccion.page.scss'],
})
export class MapaSeleccionPage implements OnInit {

  public latitude:any;
  public longitude:any;
  public miDireccion:any;
  public publicaciones:any;

  constructor(private navCtrl:NavController,
    private nativeGeocoder:NativeGeocoder,
    private utilities:UtilitiesService,
    private apiService: ApiService) { }

  ngOnInit() {
    Geolocation.getCurrentPosition().then((resp: any) =>{
      this.latitude = resp.coords.latitude;
      this.longitude = resp.coords.longitude;
      console.log(resp);
      this.getAddressFromCoords(this.latitude,this.longitude);
      let userLocation = {lat: resp.coords.latitude, lng: resp.coords.longitude}
      this.apiService.publicacionesLatitudLongitud(userLocation).subscribe((publicaciones) =>{
        this.publicaciones = publicaciones
      });
    });
  }

  public megustas(id){
    this.apiService.getEntity('megustas',id).subscribe((message) =>{
      this.utilities.showToast('Le has dado Me gusta a la Publicación')
    })
  }

  public getAddressFromCoords(latitude,longitude){
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 1
    };

    this.nativeGeocoder
      .reverseGeocode(this.latitude, this.longitude, options)
      .then((result: NativeGeocoderResult[]) => {
        this.miDireccion = "";
        let responseAddress = [];
        for (let [key, value] of Object.entries(result[0])) {
          if (value.length > 0) {
            console.log("DIRECCION", value);
            responseAddress.push(value);
          }
        }
        responseAddress.reverse();
        for (let value of responseAddress) {
          this.miDireccion += value + ", ";
        }
        this.miDireccion = this.miDireccion.slice(0, -2);
        console.log(this.miDireccion);
      })
      .catch((error: any) => {
        this.utilities.showToast(
          "No se ha encontrado ninguna dirección"
        );
      });
  }

  public back(){
    this.navCtrl.back();
  }



}
