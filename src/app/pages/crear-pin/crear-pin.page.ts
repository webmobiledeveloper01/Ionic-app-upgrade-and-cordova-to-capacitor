import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Environment, GoogleMapOptions, GoogleMaps, GoogleMapsEvent } from '@ionic-native/google-maps/ngx';
import { GoogleMap } from '@ionic-native/google-maps/ngx';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@ionic-native/native-geocoder/ngx';
import { NavController } from '@ionic/angular';
import { Tema } from 'src/app/models/Temas';
import { ApiService } from 'src/app/services/api.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { codeErrors } from 'src/app/utils/utils';

@Component({
  selector: 'app-crear-pin',
  templateUrl: './crear-pin.page.html',
  styleUrls: ['./crear-pin.page.scss'],
})
export class CrearPinPage implements OnInit {

  form:FormGroup;
  base64img: any;
  direccion: any;
  public map:GoogleMap;
  public temas:Tema;

  constructor(
    private formBuilder:FormBuilder,
    private camera:Camera,
    private utilities:UtilitiesService,
    private apiService: ApiService,
    private nativeGeocoder: NativeGeocoder,
    private navCtrl:NavController
  ) { }

   ngOnInit() {

   

    this.form = this.formBuilder.group({
      visibilidad: [''],
      direccion: [''],
      titulo: [''],
      descripcion: [''],
      lat: [''],
      longitud: [''],
    })
  


   
  
  }

  async ngAfterViewInit(){
    await this.loadMap();
}


  public async loadMap(){

    Environment.setEnv({
      API_KEY_FOR_BROWSER_RELEASE: "AIzaSyCFicGw2uNlwVz0huYvSXyuU0JnQlpaG_Y",
      API_KEY_FOR_BROWSER_DEBUG: "AIzaSyCFicGw2uNlwVz0huYvSXyuU0JnQlpaG_Y",
    });


    Environment.setBackgroundColor('white');
    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 39.416775,
          lng: -3.703
        },
        zoom: 15,
        tilt: 30
      }
    };

    this.map = GoogleMaps.create('map_canvas',mapOptions);
// var myposition;
    this.map.getMyLocation().then(res =>{
    
      this.map.moveCamera({
        target: res.latLng
      });
    });
   


    this.map.one(GoogleMapsEvent.MAP_READY).then(async () =>{
     
     /*  for(let offer of this.offers){
        this.getCoordsFromAddress(offer);
        console.log(offer.location);

      } */
 
      
    });
  }

  
  public submitForm(): void {
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 1
    };
    this.nativeGeocoder.forwardGeocode(this.form.value.direccion,options).then((result: NativeGeocoderResult[]) =>{
      this.form.value.lat = result[0].latitude;
      this.form.value.longitud = result[0].longitude;
      this.utilities.showLoading('Insertando Pin...');
      this.apiService.addEntity('pins',this.form.value).subscribe(() => {
        this.utilities.dismissLoading();
        this.utilities.showToast('Pin Creado');
        this.navCtrl.navigateRoot('/tabs/home')
      }, (error) => {
        this.utilities.showToast(codeErrors(error));
      });
      }, (err) => {
        console.log(err);
        this.utilities.dismissLoading();
        this.utilities.showToast('Ha ocurrido un error al insertar el Pin');
      });
  }


  cambiarTema(tipo){
    this.form.patchValue({
      visibilidad:tipo
    })
  }

  public back(){
    this.navCtrl.back();
  }

}
