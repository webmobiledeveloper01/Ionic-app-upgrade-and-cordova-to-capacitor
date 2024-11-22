import { Component, OnInit } from '@angular/core';
import { Environment, GoogleMap, GoogleMaps, GoogleMapsEvent, MyLocation, StreetViewCameraPosition, StreetViewLocation } from '@ionic-native/google-maps';
import { HistoricPlace } from 'src/app/models/historic-place';
import { Geolocation } from '@capacitor/geolocation';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderResult } from '@awesome-cordova-plugins/native-geocoder/ngx';
import { UtilitiesService } from 'src/app/services/utilities.service';
import { ApiService } from 'src/app/services/api.service';

declare var google;
@Component({
  selector: 'app-mapa-street',
  templateUrl: './mapa-street.page.html',
  styleUrls: ['./mapa-street.page.scss'],
})
export class MapaStreetPage implements OnInit {


  map: GoogleMap;
  panorama: any;
  public place: HistoricPlace;
  public placesMap:HistoricPlace[] = [];
  oculto:boolean = false;
  public miDireccion:any;
  public publicaciones: any;

  constructor(private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private utilities: UtilitiesService,
    private apiService: ApiService) { }

  ngOnInit() {

    this.generatePanorama();
  }


  public setCamera() {
    this.map.getMyLocation()
      .then(response => {
        this.map.moveCamera({
          target: response.latLng
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  public streetView():void{
    console.log("entra en street view");
    

    Environment.setEnv({
      API_KEY_FOR_BROWSER_RELEASE: "AIzaSyCFicGw2uNlwVz0huYvSXyuU0JnQlpaG_Y",
      API_KEY_FOR_BROWSER_DEBUG: "AIzaSyCFicGw2uNlwVz0huYvSXyuU0JnQlpaG_Y"
    });

    let div = document.getElementById("pano_canvas1");

    this.panorama= GoogleMaps.createPanorama('pano_canvas1', {
      camera: {
        target: {lat: 42.345573, lng: -71.098326},
      },
    
    });

    this.panorama.one(GoogleMapsEvent.PANORAMA_READY).then((result) => {
      console.log('panorama is ready!', result);
    }).catch(error => {
      console.log("error");
      
      console.log(error);
    });
    
    
    // Move the map camera when the panorama camera has been moved.
    this.panorama.on(GoogleMapsEvent.PANORAMA_LOCATION_CHANGE).subscribe((params:any[]) => {
      let location: StreetViewLocation = params[0];
    
    });
    
    // Change the marker bearing when the panorama camera is panning.
    this.panorama.on(GoogleMapsEvent.PANORAMA_CAMERA_CHANGE).subscribe((params: any[]) => {
      let camera: StreetViewCameraPosition = params[0];
    
    });

  }

  generatePanorama(): void {
    this.geolocation.getCurrentPosition((resp) =>{
      let userLocation = {lat: resp.coords.latitude, lng: resp.coords.longitude};
      var streetviewService = new google.maps.StreetViewService;
      streetviewService.getPanorama({
        location: userLocation,
        preference: google.maps.StreetViewPreference.NEAREST,
        radius: 100},
        function(result, status) {
          console.log("Adjusted latitude: ", result.location.latLng.lat(),
                      "\nAdjusted longitude: ", result.location.latLng.lng());
          this.panorama = new google.maps.StreetViewPanorama(document.getElementById('pano_canvas1'), {
            position: result.location.latLng,
            pov: {heading: 165, pitch: 0},
            zoom: 1
          });
        });
      console.log(resp);     
      this.getAddressFromCoords(userLocation); 
      
      this.apiService.publicacionesLatitudLongitud(userLocation).subscribe((publicaciones) =>{
        this.publicaciones = publicaciones
      });
    })
   
  }


  public getAddressFromCoords(userLocation){
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 1
    };

    this.nativeGeocoder
      .reverseGeocode(userLocation.lat, userLocation.lng, options)
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

}
