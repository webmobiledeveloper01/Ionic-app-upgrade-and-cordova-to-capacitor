import { Component, OnInit } from "@angular/core";
import { environment } from "../../../environments/environment";
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  MarkerCluster,
  MarkerClusterIcon,
  Environment,
  GoogleMapOptions,
  MarkerIcon,
  Marker,
  HtmlInfoWindow,
  StreetViewPanorama,
  StreetViewLocation,
  StreetViewCameraPosition,
} from "@ionic-native/google-maps";
import { HistoricPlace } from "src/app/models/historic-place";
import { Router } from "@angular/router";
import { ApiService } from "src/app/services/api.service";
import { ModalController, NavController, Platform } from "@ionic/angular";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import {
  NativeGeocoder,
  NativeGeocoderOptions,
  NativeGeocoderResult,
} from "@ionic-native/native-geocoder/ngx";
import { UtilitiesService } from "src/app/services/utilities.service";
import { ModalAjustesPage } from "../modal-ajustes/modal-ajustes.page";
import { promise } from "protractor";

declare var google;

@Component({
  selector: "app-mapp",
  templateUrl: "./mapp.page.html",
  styleUrls: ["./mapp.page.scss"],
})
export class MappPage implements OnInit {
  map: GoogleMap;
  panorama: any;
  public place: HistoricPlace;
  public placesMap: HistoricPlace[] = [];
  QuestionMarkers: Marker[] = [];
  postMarkers: Marker[] = [];
  oculto: boolean = false;
  public latitude: any;
  public longitude: any;
  public miDireccion: any;
  questions: any[] = [];
  pins: any[] = [];
  width: any;
  height: any;
  public isIos: boolean;
  constructor(
    private router: Router,
    private apiService: ApiService,
    private navCtrl: NavController,
    private geolocation: Geolocation,
    private nativeGeocoder: NativeGeocoder,
    private utilities: UtilitiesService,
    private modalController: ModalController,
    private platform: Platform
  ) {}

  async ngOnInit() {
    this.isIos = this.platform.is("ios");
    console.log(this.isIos);

    this.SetView();

    this.apiService.questionChange.subscribe(async () => {
      await this.getQuestions().then(async () => {
        await this.getPublicaciones().then(() => {
          this.addMarkers();
        });
      });
    });

    //this.generatePanorama();
  }

  async ionViewWillEnter() {
    await this.getQuestions().then(async () => {
      await this.getPublicaciones().then(async () => {
        await this.getPins().then(async () => {
          await this.loadMap().then(() => {
            this.addMarkers();
          });
        });
      });
    });
  }

  async getPins() {
    let res = await this.apiService.getEntity("pins").toPromise();

    console.log("RESPONSE pins", res);

    this.pins = res.data;
  }

  SetView() {
    this.width = this.platform.width();
    this.height = this.platform.height();

    console.log("WIDTH=>");
    console.log(this.width);

    console.log("HEIGHT=>");
    console.log(this.height);
  }

  async ngOnDestroy(): Promise<void> {
    console.log("onDestroy run");
  }

  async newQuestion() {
    await this.map.remove().then(() => {
      this.navCtrl.navigateRoot("/new-question");
    });
  }

  async getQuestions() {
    try {
      let res = await this.apiService
        .getEntity("question")
        .toPromise()
        .catch((error) => {
          throw new error(error);
        });

      console.log("PREGUNTAS=> ", res);

      this.questions = res.data;
    } catch (error) {
      console.log(error);
    }
  }
  async getPublicaciones() {
    try {
      let res = await this.apiService.getEntity("publicaciones").toPromise();
      this.placesMap = res;

      console.log("Recibidos Places=>");

      console.log(this.placesMap);
    } catch (error) {
      console.log(error);
    }
  }

  ionViewDidLoad() {}

  async loadMap() {
    // this.geolocation.getCurrentPosition().then((resp) => {
    //   this.latitude = resp.coords.latitude;
    //   this.longitude = resp.coords.longitude;
    //   console.log(resp);
    //   this.getAddressFromCoords(this.latitude, this.longitude);
    // });

    // this.placesMap.push({lat:36.6801604, long:-6.1307971});
    Environment.setEnv({
      API_KEY_FOR_BROWSER_RELEASE: "AIzaSyCFicGw2uNlwVz0huYvSXyuU0JnQlpaG_Y",
      API_KEY_FOR_BROWSER_DEBUG: "AIzaSyCFicGw2uNlwVz0huYvSXyuU0JnQlpaG_Y",
    });
    const styles = [
      {
        featureType: "poi",
        stylers: [{ visibility: "off" }],
      },
    ];

    let mapOptions: GoogleMapOptions = {
      // mapType: "MAP_TYPE_SATELLITE",
      styles: styles,
      camera: {
        target: {
          // lat: 40.712784,
          // lng: -74.005941
          lat: 0,
          lng: 0,
          // lat: 37.789441,
          // lng: -122.419397,
        },
        zoom: 12,
        tilt: 30,
      },
    };

    this.map = GoogleMaps.create("map_canvas", mapOptions);
    await this.map
      .one(GoogleMapsEvent.MAP_READY)
      .then(async () => {
        this.map.setMapTypeId("MAP_TYPE_SATELLITE");
        this.map.setMyLocationEnabled(true);
        this.map.setMyLocationButtonEnabled(true);

        // console.log("TIPO");
        // console.log(this.map);

        this.map
          .getMyLocation()
          .then((res) => {
            this.map.moveCamera({
              target: res.latLng,
            });
          })
          .catch(async (error) => {
            await this.utilities.showAlert(
              "Vaya...",
              "Activa la localizacion y vuelve a cargar el mapa"
            );
            console.log(error);
          });

        //**** */
      })
      .catch(async (error) => {
        await this.utilities.showAlert(
          "Vaya...",
          "Activa la localizacion y vuelve a cargar el mapa"
        );
        console.log(error);
      });
  }

  public async setCamera(datos) {
    console.log(datos);
    this.map.moveCamera({
      target: datos,
    });

    // if (datos) {
    //   let options: NativeGeocoderOptions = {
    //     useLocale: true,
    //     maxResults: 1,
    //   };
    //   this.nativeGeocoder.forwardGeocode(datos, options).then((response) => {
    //     console.log(response);
    //     let userLocation = {
    //       lat: response[0].latitude,
    //       lng: response[0].longitude,
    //     };
    //     this.map.moveCamera({
    //       target: userLocation,
    //     });
    //   });
    //   this.miDireccion = datos;
    // } else {
    //   await this.map
    //     .getMyLocation()
    //     .then((response) => {
    //       console.log("Respuesta Localizacion Camara", response);

    //       this.map.moveCamera({
    //         target: response.latLng,
    //       });
    //     })
    //     .catch(async (error) => {
    //       await this.utilities.showAlert("Vaya...", error.error_message);
    //       console.log(error);
    //     });
    // }
  }

  public addMarkers(): void {
    this.map.clear();

    // let iconPlace: MarkerIcon = {
    //   url: "https://timemapp.davidtovar.dev/storage/CtD5XZr2MZ6RVTvMc0uSuzRjA0v86MTmEuHt2v5h.png",
    //   size: {
    //     width: 27,
    //     height: 40,
    //   },
    // };

    this.SetQuestions();
    this.SetPlaces();
    this.SetPins();
  }

  percentage(num, per) {
    return (num / 100) * per;
  }

  SetPlaces() {
    let markers = [];
    for (let place of this.placesMap) {
      markers.push({
        // title: '',
        position: { lat: Number(place.lat), lng: Number(place.longitud) },
        icon: {
          url: "https://timemapp.davidtovar.dev/storage/PHskaBr6u3p8LCov5K0hyyU2n9GLo6xr3DOkztei.png",
          size: {
            width: 40,
            height: 60,
          },
        },
        archivo: place.archivo,
        InstanceOfPost: place,
      });
    }
    this.createMarkerCluster(markers);
    // let iconPlace: MarkerIcon = {
    //   url: "https://timemapp.davidtovar.dev/storage/PHskaBr6u3p8LCov5K0hyyU2n9GLo6xr3DOkztei.png",
    //   size: {
    //     width: 40,
    //     height: 60,
    //   },
    // };

    // for (let place of this.placesMap) {
    //   //
    //   let marker: Marker = this.map.addMarkerSync({
    //     animation: "DROP",
    //     icon: iconPlace,
    //     // title: "Marca",
    //     position: { lat: place.lat, lng: place.longitud },
    //   });

    //   let htmlInfoWindow = new HtmlInfoWindow();
    //   let frame: HTMLElement = document.createElement("div");

    //   frame.innerHTML = [
    //     '<div class="divMapa" >',
    //     '<h3 class="titulo">' + place.titulo + "</h3>",
    //     '<img class="imagenDiv" style="height: 60%; width: 90%; object-fit: cover; margin: 5% auto;" src="' +
    //       place.archivo +
    //       '"  >',
    //     "</div>",
    //   ].join("");

    //   frame
    //     .getElementsByClassName("imagenDiv")[0]
    //     .addEventListener("click", () => {
    //       this.redireccion(place);
    //     });

    //   // let w = this.percentage(this.width, 40) + "px";
    //   let h = this.percentage(this.height, 40) + "px";

    //   htmlInfoWindow.setContent(frame, {
    //     width: h,
    //     // "180px"
    //     height: h,
    //     // "150px"
    //   });

    //   marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
    //     htmlInfoWindow.open(marker);
    //   });

    //   this.postMarkers.push(marker);
    // }
  }

  async drawImage(numberToDraw): Promise<string> {
    var base64Image = "";
    var img = new Image();
    img.src = "../../../assets/icons/icono-SMALL.png";
    img.onload = async () => {
      await this.drawNumber(img, numberToDraw).then((base) => {
        base64Image = base;
        console.log("TERMINO DE DIBUJAR");
      });
    };
    return base64Image;
  }

  async drawNumber(img, numberToDraw) {
    let base64Image = "";
    console.log("INICIA DIBUJADO");

    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    ctx.font = "20px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "right";
    ctx.fillText(numberToDraw, canvas.width - 10, 30);

    base64Image = canvas.toDataURL("image/png");
    // console.log(base64Image);
    return base64Image;
  }

  public async createMarkerCluster(data) {
    //------------------------------------------------------
    // Create a marker cluster.
    // Providing all locations at the creating is the best.
    //------------------------------------------------------
    console.log("Llamado el metodo con esta data => ", data);

    var labelOptions = {
      bold: true,
      fontSize: 20,
      color: "white",
      italic: false,
    };
    var url = "";
    // await this.drawImage(data.length).then((res) => {
    //   url = res;
    // });

    let iconito: MarkerIcon = {
      url: "../../../assets/icons/icono-SMALL.png",
      size: {
        width: 60,
        height: 40,
      },
    };
    // console.log("dibujado =>", iconito);

    var markerCluster = this.map
      .addMarkerCluster({
        //debug: true,
        //maxZoomLevel: 5,
        zoomOnClick: false,
        minimumClusterSize: 1,
        markers: data,
        boundsDraw: false,
        icons: [
          {
            min: 1,
            max: 999,
            // url: "https://timemapp.davidtovar.dev/storage/pMxKCReA1It9W94cWJCLNdRNCyTsZUfdcQlFwPAG.png",
            url: iconito.url,
            anchor: { x: 10, y: 10 },
            size: {
              width: iconito.size.width,
              height: iconito.size.height,
            },
            label: labelOptions,
          },
        ],
      })
      .then((markerCluster: MarkerCluster) => {
        console.log("response marker cluster added", markerCluster);

        markerCluster.on(GoogleMapsEvent.MARKER_CLICK).subscribe(
          (res) => {
            console.log(res[1]);
            console.log("marker click");
            this.OpenInfoWindow(res[1]);
          },
          (error) => {
            console.log(error);
          }
        );

        markerCluster.on("cluster_click").subscribe(
          async (cluster) => {
            await this.BuildMuroObject(cluster);
          },
          (error) => {
            console.log(error);
          }
        );
      });

    console.log(markerCluster);
  }

  async BuildMuroObject(cluster) {
    console.log("cluster click");
    console.log(cluster);
    const InstanceOfCluster = cluster[0];
    const markers = InstanceOfCluster._markerArray;
    const markers_length = markers.length;
    let near: string = await this.getNearAddress(
      InstanceOfCluster._markerCenter.lat,
      InstanceOfCluster._markerCenter.lng
    );
    console.log("Near is =>", near);

    let ObjectPosts = {
      posts: [],
      near: near,
      count: InstanceOfCluster._markerCnt,
    };
    let contador = 0;

    for (contador; contador < markers_length; contador++) {
      ObjectPosts.posts.push(markers[contador].get("InstanceOfPost"));
    }
    console.log(ObjectPosts);
    this.GoToMuro(ObjectPosts);
  }

  GoToMuro(ObjetoPost) {
    this.navCtrl.navigateForward("/muro-proximidad", {
      state: {
        ObjetoPost: ObjetoPost,
      },
    });
  }

  OpenInfoWindow(marker) {
    let htmlInfoWindow = new HtmlInfoWindow();
    let frame: HTMLElement = document.createElement("div");
    let post = marker.get("InstanceOfPost");
    let innerFrame;
    let object = "";
    switch (post.tipo_archivo) {
      case 1:
        object = this.getImageStyle(post.archivo);
        console.log("OBJECT IS=>", object);

        innerFrame = [
          '<div class="divMapa" >',
          '<h3 class="titulo">' + post.titulo + "</h3>",
          '<img class="imagenDiv" style="height: 60%; width: 90%; ' +
            object +
            '; margin: 5% auto;" src="' +
            post.archivo +
            '"  >',
          "</div>",
        ];

        break;

      default:
        object = this.getImageStyle(post.user.avatar);
        console.log("OBJECT IS=>", object);
        innerFrame = [
          '<div class="divMapa" >',
          '<h3 class="titulo">' + post.titulo + "</h3>",
          '<img class="imagenDiv" style="height: 60%; width: 90%; ' +
            object +
            '; margin: 5% auto;" src="' +
            post.user.avatar +
            '"  >',
          "</div>",
        ];
        break;
    }

    frame.innerHTML = innerFrame.join("");

    frame
      .getElementsByClassName("imagenDiv")[0]
      .addEventListener("click", () => {
        this.redireccion(post);
      });

    // let w = this.percentage(this.width, 40) + "px";
    let h = this.percentage(this.height, 40) + "px";

    htmlInfoWindow.setContent(frame, {
      width: h,
      // "180px"
      height: h,
      // "150px"
    });

    htmlInfoWindow.open(marker);
  }

  getImageStyle(image) {
    const img = new Image();
    img.src = image;
    let imageWidth = img.width;
    let imageHeight = img.height;

    if (imageWidth && imageHeight) {
      const aspectRatio = imageWidth / imageHeight;

      console.log("RATIO OF IMAGE=>", aspectRatio);

      if (aspectRatio > 1) {
        return "object-fit:cover ";
      } else {
        return "object-fit:contain";
      }
    }

    // Default style
    return "object-fit:fill";
  }

  async SetPins() {
    for (let place of this.pins) {
      // let bounds = [
      //   {
      //     lat: place.latitud,
      //     lng: place.longitud,
      //   },
      // ];

      // let res = this.map
      //   .addGroundOverlay({
      //     url: "assets/icon/icon.png",
      //     bounds: bounds,
      //     clickable: true,
      //     zIndex: 99999,
      //   })
      //   .then(
      //     (result) => {
      //       console.log("success", result);
      //     },
      //     (error) => {
      //       console.log("error", error);
      //     }
      //   );

      console.log("pin WILL BE SETTED =>", place);
      // console.log("Overlay=> ");

      // console.log(res);
      let iconpin: MarkerIcon = {
        url: "https://timemapp.davidtovar.dev/storage/QTYH7JKuCqj64pYlepLvNIozVJ4cboTsRjrPGpxz.png",
        size: {
          width: 40,
          height: 60,
        },
      };

      let marker: Marker = this.map.addMarkerSync({
        animation: "DROP",
        icon: iconpin,
        title: "Pin oficial",
        position: { lat: place.latitud, lng: place.longitud },
      });

      let htmlInfoWindow = new HtmlInfoWindow();
      let frame: HTMLElement = document.createElement("div");
      console.log("631");

      frame.innerHTML = [
        '<div class="divMapa" >',
        '<img class="imagenDiv" style="max-height:30vh;height: 60%; width: 90%; ; margin: 5% auto;" src="' +
          place.useravatar +
          '"  >',
        "</div>",
      ].join("");
      console.log(frame);

      frame
        .getElementsByClassName("imagenDiv")[0]
        .addEventListener("click", () => {
          this.redireccionQuestion(place);
        });

      let w = this.percentage(this.width, 40) + "px";
      let h = this.percentage(this.height, 40) + "px";

      htmlInfoWindow.setContent(frame, {
        width: h,
        // "180px"
        height: h,
        // "150px"
      });
      marker.on(GoogleMapsEvent.MAP_CLICK).subscribe(() => {
        htmlInfoWindow.open(marker);
      });
    }
  }

  SetQuestions() {
    let iconPlace: MarkerIcon = {
      url: "https://timemapp.davidtovar.dev/storage/APRxUJVQGUNgZdjT8PvMkasnzHgUHj9X9Ozfy27Z.png",
      size: {
        width: 40,
        height: 60,
      },
    };

    for (let place of this.questions) {
      let marker: Marker = this.map.addMarkerSync({
        animation: "DROP",
        icon: iconPlace,
        // title: "Marca",
        position: { lat: place.lat, lng: place.lng },
      });

      let htmlInfoWindow = new HtmlInfoWindow();
      let frame: HTMLElement = document.createElement("div");

      frame.innerHTML = [
        '<div class="divMapa" >',
        '<h3 class="titulo">' + place.question + "</h3>",
        '<img class="imagenDiv" style="max-height:30vh;height: 60%; width: 90%; object-fit: cover; margin: 5% auto;" src="' +
          place.archivo +
          '"  >',
        "</div>",
      ].join("");

      frame
        .getElementsByClassName("imagenDiv")[0]
        .addEventListener("click", () => {
          this.redireccionQuestion(place);
        });

      let w = this.percentage(this.width, 40) + "px";
      let h = this.percentage(this.height, 40) + "px";

      htmlInfoWindow.setContent(frame, {
        width: h,
        // "180px"
        height: h,
        // "150px"
      });
      marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
        htmlInfoWindow.open(marker);
      });

      this.QuestionMarkers.push(marker);
    }
  }

  public getAddressFromCoords(latitude, longitude) {
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 1,
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
        return this.miDireccion;
      })
      .catch((error) => {
        console.error(error);
        this.utilities.showToast("No se ha encontrado ninguna dirección");
        return -1;
      });
  }

  public async getNearAddress(latitude, longitude): Promise<string> {
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 1,
    };
    var responseAddress = "";
    await this.nativeGeocoder
      .reverseGeocode(latitude, longitude, options)
      .then((result: NativeGeocoderResult[]) => {
        let resultado = result;
        console.log(resultado);

        for (let [key, value] of Object.entries(resultado[0])) {
          // console.log("key =>", key);
          // console.log("value =>", value);

          if (key == "locality" && value.toString().length > 0) {
            console.log("HAY LOCALITY");
            responseAddress += ", " + value.toString();
          }
          if (key == "administrativeArea" && value.toString().length > 0) {
            console.log("HAY Admin");

            responseAddress += ", " + value.toString();
          }
          if (key == "countryName" && value.toString().length > 0) {
            console.log("HAY Countryname");
            responseAddress += value.toString();
          }
        }

        responseAddress = responseAddress.split(",").reverse().join(",");
        console.log("se devuelve =>", responseAddress);
      })
      .catch((error) => {
        console.error(error);
        // this.utilities.showToast("No se ha encontrado ninguna dirección");
        responseAddress = "void";
      });

    return responseAddress;
  }

  public streetView(): void {
    console.log("entra en street view");

    Environment.setEnv({
      API_KEY_FOR_BROWSER_RELEASE: "AIzaSyCFicGw2uNlwVz0huYvSXyuU0JnQlpaG_Y",
      API_KEY_FOR_BROWSER_DEBUG: "AIzaSyCFicGw2uNlwVz0huYvSXyuU0JnQlpaG_Y",
    });

    let div = document.getElementById("pano_canvas1");

    this.panorama = GoogleMaps.createPanorama("pano_canvas1", {
      camera: {
        target: { lat: 42.345573, lng: -71.098326 },
      },
    });

    this.panorama
      .one(GoogleMapsEvent.PANORAMA_READY)
      .then((result) => {
        console.log("panorama is ready!", result);
      })
      .catch((error) => {
        console.log("error");

        console.log(error);
      });

    // Move the map camera when the panorama camera has been moved.
    this.panorama
      .on(GoogleMapsEvent.PANORAMA_LOCATION_CHANGE)
      .subscribe((params: any[]) => {
        let location: StreetViewLocation = params[0];
      });

    // Change the marker bearing when the panorama camera is panning.
    this.panorama
      .on(GoogleMapsEvent.PANORAMA_CAMERA_CHANGE)
      .subscribe((params: any[]) => {
        let camera: StreetViewCameraPosition = params[0];
      });
  }

  public redireccion(place): void {
    this.navCtrl.navigateForward("detalle-publicacion/" + place.id, {
      state: {
        post: place,
      },
    });
  }

  public redireccionQuestion(place): void {
    this.navCtrl.navigateForward("/answer-question", {
      state: {
        question: place,
      },
    });
  }

  generatePanorama(): void {
    let userLocation = { lat: 42.345573, lng: -71.098326 };
    var streetviewService = new google.maps.StreetViewService();
    streetviewService.getPanorama(
      {
        location: userLocation,
        preference: google.maps.StreetViewPreference.NEAREST,
        radius: 100,
      },
      function (result, status) {
        console.log(
          "Adjusted latitude: ",
          result.location.latLng.lat(),
          "\nAdjusted longitude: ",
          result.location.latLng.lng()
        );
        this.panorama = new google.maps.StreetViewPanorama(
          document.getElementById("pano_canvas1"),
          {
            position: result.location.latLng,
            pov: { heading: 165, pitch: 0 },
            zoom: 1,
          }
        );
      }
    );
  }

  async ajustes() {
    const modal = await this.modalController.create({
      component: ModalAjustesPage,
      cssClass: "modal-eliminar",
      componentProps: {},
    });
    modal.onDidDismiss().then((dataReturned) => {
      console.log("data returned)", dataReturned);
      this.setCamera(dataReturned.data);
    });
    await modal.present();
  }

  async ionViewWillLeave() {
    await this.map.remove().then(() => {
      this.map = null;
    });
  }

  back() {
    this.navCtrl.navigateRoot("tabs/home");
    // window.history.back();
  }
}
