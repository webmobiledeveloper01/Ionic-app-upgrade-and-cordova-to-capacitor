import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { GoogleMap } from '@capacitor/google-maps';
import { ApiService } from 'src/app/services/api.service';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { codeErrors } from 'src/app/utils/utils';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-crear-pin',
  templateUrl: './crear-pin.page.html',
  styleUrls: ['./crear-pin.page.scss'],
standalone: false,
})
export class CrearPinPage implements OnInit {
  form: FormGroup;
  map: GoogleMap | undefined;
  mapElement: HTMLElement | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private utilities: UtilitiesService,
    private apiService: ApiService,
    private nativeGeocoder: NativeGeocoder,
    private navCtrl: NavController,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      visibilidad: [''],
      direccion: [''],
      titulo: [''],
      descripcion: [''],
      lat: [''],
      longitud: [''],
    });
  }

  async ngAfterViewInit() {
    this.mapElement = document.getElementById('map_canvas') as HTMLElement;
    if (this.mapElement) {
      await this.createMap();
    }
  }

  async createMap() {
    try {
      this.map = await GoogleMap.create({
        id: 'google-map', // Unique identifier
        element: this.mapElement,
        apiKey: 'AIzaSyCFicGw2uNlwVz0huYvSXyuU0JnQlpaG_Y', // Replace with your Google Maps API key
        config: {
          center: { lat: 39.416775, lng: -3.703 }, // Initial map center
          zoom: 15,
        },
      });

      console.log('Map created successfully!');

      // Add a listener for map clicks
      this.map.setOnMapClickListener((event) => {
        console.log('Map clicked at:', event);
        this.addMarker(event.latitude, event.longitude);
      });

      // Enable current location on the map
      await this.map.enableCurrentLocation(true);
    } catch (error) {
      console.error('Error creating map:', error);
    }
  }

  async addMarker(lat: number, lng: number) {
    if (!this.map) return;

    await this.map.addMarker({
      coordinate: { lat, lng },
      title: 'Selected Location',
      snippet: 'This is the chosen location.',
    });

    console.log('Marker added at:', lat, lng);

    // Update form values
    this.form.patchValue({
      lat,
      longitud: lng,
    });
  }

  async submitForm() {
    try {
      const options: NativeGeocoderOptions = {
        useLocale: true,
        maxResults: 1,
      };

      const result: NativeGeocoderResult[] = await this.nativeGeocoder.forwardGeocode(this.form.value.direccion, options);

      this.form.patchValue({
        lat: result[0].latitude,
        longitud: result[0].longitude,
      });

      this.utilities.showLoading('Insertando Pin...');
      await this.apiService.addEntity('pins', this.form.value).toPromise();

      this.utilities.dismissLoading();
      this.utilities.showToast('Pin Creado');
      this.navCtrl.navigateRoot('/tabs/home');
    } catch (error) {
      this.utilities.dismissLoading();
      this.utilities.showToast(this.translateService.instant('Ha ocurrido un error al insertar el Pin'));
      console.error('Error submitting form:', error);
    }
  }

  cambiarTema(tipo: string) {
    this.form.patchValue({
      visibilidad: tipo,
    });
  }

  back() {
    this.navCtrl.back();
  }
}




// ==============

// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { Camera, CameraOptions } from '@capacitor/camera';
// import { GoogleMap} from '@capacitor/google-maps';
// import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@awesome-cordova-plugins/native-geocoder/ngx';
// import { NavController } from '@ionic/angular';
// import { Tema } from 'src/app/models/Temas';
// import { ApiService } from 'src/app/services/api.service';
// import { UtilitiesService } from 'src/app/services/utilities.service';
// import { codeErrors } from 'src/app/utils/utils';
// import { TranslateService } from '@ngx-translate/core';

// @Component({
//   selector: 'app-crear-pin',
//   templateUrl: './crear-pin.page.html',
//   styleUrls: ['./crear-pin.page.scss'],
// standalone: false,
// })
// export class CrearPinPage implements OnInit {

//   form:FormGroup;
//   base64img: any;
//   direccion: any;
//   public map:GoogleMap;
//   public temas:Tema;

//   constructor(
//     private formBuilder:FormBuilder,
//     // private camera:Camera,
//     private utilities:UtilitiesService,
//     private apiService: ApiService,
//     private nativeGeocoder: NativeGeocoder,
//     private navCtrl:NavController,
//     private translateService: TranslateService
//   ) { }

//    ngOnInit() {



//     this.form = this.formBuilder.group({
//       visibilidad: [''],
//       direccion: [''],
//       titulo: [''],
//       descripcion: [''],
//       lat: [''],
//       longitud: [''],
//     })





//   }

//   async ngAfterViewInit(){
//     await this.loadMap();
// }


//   public async loadMap(){

//     Environment.setEnv({
//       API_KEY_FOR_BROWSER_RELEASE: "AIzaSyCFicGw2uNlwVz0huYvSXyuU0JnQlpaG_Y",
//       API_KEY_FOR_BROWSER_DEBUG: "AIzaSyCFicGw2uNlwVz0huYvSXyuU0JnQlpaG_Y",
//     });


//     Environment.setBackgroundColor('white');
//     let mapOptions: GoogleMapOptions = {
//       camera: {
//         target: {
//           lat: 39.416775,
//           lng: -3.703
//         },
//         zoom: 15,
//         tilt: 30
//       }
//     };

//     this.map = GoogleMaps.create('map_canvas',mapOptions);
// // var myposition;
//     this.map.getMyLocation().then(res =>{

//       this.map.moveCamera({
//         target: res.latLng
//       });
//     });



//     this.map.one(GoogleMapsEvent.MAP_READY).then(async () =>{

//      /*  for(let offer of this.offers){
//         this.getCoordsFromAddress(offer);
//         console.log(offer.location);

//       } */


//     });
//   }


//   public submitForm(): void {
//     let options: NativeGeocoderOptions = {
//       useLocale: true,
//       maxResults: 1
//     };
//     this.nativeGeocoder.forwardGeocode(this.form.value.direccion,options).then((result: NativeGeocoderResult[]) =>{
//       this.form.value.lat = result[0].latitude;
//       this.form.value.longitud = result[0].longitude;
//       this.utilities.showLoading('Insertando Pin...');
//       this.apiService.addEntity('pins',this.form.value).subscribe(() => {
//         this.utilities.dismissLoading();
//         this.utilities.showToast('Pin Creado');
//         this.navCtrl.navigateRoot('/tabs/home')
//       }, (error) => {
//         this.utilities.showToast(codeErrors(error));
//       });
//       }, (err) => {
//         console.log(err);
//         this.utilities.dismissLoading();
//         this.utilities.showToast(this.translateService.instant('Ha ocurrido un error al insertar el Pin'));
//       });
//   }


//   cambiarTema(tipo){
//     this.form.patchValue({
//       visibilidad:tipo
//     })
//   }

//   public back(){
//     this.navCtrl.back();
//   }

// }
