import { Component, OnInit, ViewChild } from "@angular/core";
import { NavController } from "@ionic/angular";
import { ApiService } from "src/app/services/api.service";
import {
  GoogleMap, Marker
} from "@capacitor/google-maps";
import { UtilitiesService } from "src/app/services/utilities.service";
import {
  NativeGeocoder,
  NativeGeocoderOptions,
  NativeGeocoderResult,
} from "@awesome-cordova-plugins/native-geocoder/ngx";
import { AuthenticationService } from "src/app/services/authentication.service";
import { TranslateService } from "@ngx-translate/core";
import { environment } from "src/environments/environment";
import { CreateMapArgs } from "@capacitor/google-maps/dist/typings/implementation";

@Component({
  selector: "app-buscador-publicaciones",
  templateUrl: "./buscador-publicaciones.page.html",
  styleUrls: ["./buscador-publicaciones.page.scss"],
})




export class BuscadorPublicacionesPage implements OnInit {
  @ViewChild("FlechaIcon", { static: false }) FlechaIcon: any;
  posts;
  isVoid: boolean = false;
  MustShowFiltros: boolean = false;
  map: GoogleMap;
  temas: any;
  markerMaps: Marker;
  //Deberias mandar estos valores
  search: string = ""; //Busqueda por palabras
  direccionSeleccionada: string;
  FechaFiltro = {
    day: "",
    month: "",
    year: "",
  };
  SelectedTemas: number[] = [];
  SearchLocalizacionSend: any = "";
  //Hasta aqui

 public decadas: any[] = [
    { value: 1910, nombre: "Decada 10" },
    { value: 1920, nombre: "Decada 20" },
    { value: 1930, nombre: "Decada 30" },
    { value: 1940, nombre: "Decada 40" },
    { value: 1950, nombre: "Decada 50" },
    { value: 1960, nombre: "Decada 60" },
    { value: 1970, nombre: "Decada 70" },
    { value: 1980, nombre: "Decada 80" },
    { value: 1990, nombre: "Decada 90" },
    { value: 2000, nombre: "Decada 2000" },
    { value: 2010, nombre: "Decada 2010" },
    { value: 2020, nombre: "Decada 2020" },
  ];
  IsUsingDate: any;
  IsUsingDecade: boolean;

  constructor(
    private nav: NavController,
    private api: ApiService,
    public utils: UtilitiesService,
    private geo: NativeGeocoder,
    private Auth: AuthenticationService,
    private translateService: TranslateService
  ) {}

  async ngOnInit() {
    await this.getCategories();
  }

  back() {
    this.nav.back();
  }

  async SearchPublicacionesFilter() {
    let params = {
      search: this.search,
      // direccionSeleccionada: this.direccionSeleccionada,
      FechaFiltro: this.FechaFiltro,
      SelectedTemas: this.SelectedTemas,
      SearchLocalizacionSend: this.SearchLocalizacionSend,
    };

    if (this.everyFieldIsVoid(params)) {
      this.utils.showAlert(
        this.translateService.instant("¡Vaya!"),
        this.translateService.instant("Introduce algun termino para tu busqueda")
      );
    } else {
      await this.api
        .BuscarPorFiltros(params)
        .toPromise()
        .then((res) => {
          console.log("LLEGA ESTO");
          console.log(res);
          this.posts = res;

          this.isVoid = this.posts.length < 1;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
  everyFieldIsVoid(params) {
    let isAllVoid: boolean = true;
    const NoSearch: boolean = params.search.trim() == "";
    const FechaEmpty: boolean = Object.values(params.FechaFiltro).every(
      (val) => val === ""
    );
    const NoSelectedTemas: boolean = params.SelectedTemas.length < 1;
    const NoLocationSearch: boolean = params.SearchLocalizacionSend == "";

    isAllVoid = NoSearch && FechaEmpty && NoSelectedTemas && NoLocationSearch;

    return isAllVoid;
  }

  async SearchPublicaciones() {
    // console.log($event.target.value);
    let query: string = this.search;

    console.log(query);

    let invalidQuery = !this.IsEmptyString(query);

    console.log(invalidQuery);

    if (invalidQuery) {
    } else {
      let res = await this.api.buscadorPost(query).toPromise();

      console.log(res);
      if (res.status == "ok") {
        this.posts = res.data;
        this.isVoid = false;
      } else {
        this.posts = [];
        this.isVoid = true;
      }
    }
  }

  async handleLike($event) {
    console.log("HA LLEGADO =>");

    console.log($event);
    let res;
    if ($event.like) {
      console.log("te gusta la publicacion");

      res = await this.api.getEntity("megustas", $event.id).toPromise();

      console.log(res);
    } else {
      let params = {
        id: $event.id,
      };

      res = await this.api.deleteEntity("megustas", $event.id).toPromise();

      console.log(res);
      console.log("ya no te gusta la publicacion");
    }
  }

  GoToProfile(evento) {
    console.log("EVENT IS");

    console.log(evento);

    this.nav.navigateForward("/perfil-publico", {
      state: {
        userProfile: evento,
      },
    });
  }

  async MostrarFiltros(event) {
    this.MustShowFiltros = !this.MustShowFiltros;
    // console.log(this.FlechaIcon);
    this.FlechaIcon.el.classList.toggle("rotated");

    if (this.MustShowFiltros) {
      setTimeout(async () => {
        await this.loadMap();
      }, 100);
    } else {
      if (this.map != null && typeof this.map != "undefined") {
        // await this.map.remove(); // TODO: Remove map
      }
    }
  }

  public async traerTemas() {
    this.api.getEntity("temas").subscribe((temas: any) => {
      this.temas = temas;
    });
  }

  SelectThisChip(id: number, event) {
    console.log("ID IS", id);
    event.target.classList.toggle("customChip");

    console.log("LA CLASSLIST ES=>" ,event.target.classList);

    if (this.SelectedTemas.includes(id)) {
      this.SelectedTemas = this.SelectedTemas.filter((num) => num !== id);
    } else {
      this.SelectedTemas.push(id);
    }
    console.log("SELECTED IS=>", this.SelectedTemas);
  }

  // ResetAndSetDateValue(value, key, options, IsUsingDate = false) {
  //   this.IsUsingDate = IsUsingDate;

  //   if (IsUsingDate) {
  //     // this.ResetDecadeValue();
  //     this.SetDateValue(value, key, options);
  //   } else {
  //     this.resetFecha();
  //   }
  // }

  SetDateValue(value, key, options) {
    let Returnvalue = "" + this.formatfecha(value, options);
    if (Returnvalue != "NaN") {
      this.FechaFiltro[key] = Returnvalue;
    } else {
      this.FechaFiltro[key] = "";
    }

    console.log(this.FechaFiltro);
  }

  formatfecha(value, options) {
    let formatDate = new Date(value);

    try {
      switch (options) {
        case 1:
          let day = "" + formatDate.getDate();
          if (Number(day) < 10) {
            day = "0" + day;
          }
          return day;
          break;
        case 2:
          let month = "" + (formatDate.getMonth() + 1);
          if (Number(month) < 10) {
            month = "0" + month;
          }
          return month;
          break;
        case 3:
          return formatDate.getFullYear();
          break;
        default:
          return formatDate.getFullYear();
      }
    } catch (error) {
      return "NaN";
    }
  }

  ResetAndUseDecade(event, isUsingDecade = false) {
    this.IsUsingDecade = isUsingDecade;

    if (this.IsUsingDecade) {
      this.resetFecha();
      this.UsingDecade(event);
    } else {
      // this.ResetDecadeValue();
    }
  }

  // ResetDecadeValue() {
  //   this.DecadeInputValue = "";
  //   this.DecadeInput.el.value = "";

  //   console.log(this.DecadeInputValue);
  //   console.log(this.DecadeInput.el.value);
  // }

  UsingDecade(event) {
    // console.log(this.DecadeInputValue);

    console.log(event);

    let row = event.target.parentElement.parentElement;
    // console.log("ROW IS => ", row);

    let fechainputs = Array.from(row.getElementsByTagName("ion-datetime"));
    // console.log("fechainputs IS => ", fechainputs);

    fechainputs.forEach((element: any) => {
      element.value = "";
      const FechaEmpty: boolean = Object.values(this.FechaFiltro).every(
        (val) => val === ""
      );
    });

    console.log(this.FechaFiltro);
  }

  resetFecha() {
    Object.keys(this.FechaFiltro).forEach((key) => {
      this.FechaFiltro[key] = "";
    });
  }

  public async loadMap() {
    // this.MustShowMap = true;
    // Environment.setEnv({
    //   API_KEY_FOR_BROWSER_DEBUG: "AIzaSyDmfNZjzV2rN3hJZuMihXZIiB3Hjkw0LtE",
    //   API_KEY_FOR_BROWSER_RELEASE: "AIzaSyDmfNZjzV2rN3hJZuMihXZIiB3Hjkw0LtE",
    // });
    // Environment.setBackgroundColor("white");
    // let mapOptions: CreateMapOptions;

  let  mapOptions : CreateMapArgs = {
    id: 'mapcontainerid',
apiKey: 'AIzaSyDmfNZjzV2rN3hJZuMihXZIiB3Hjkw0LtE',
      element: document.getElementById("map-container"),
      config: {
        center: {
          lat: 0,
          lng: 0,
        },
        zoom: 15,
        // tilt: 30,
      },
    };

    this.map = await GoogleMap.create(mapOptions);

   // TODO
    // this.map
    //   .getMyLocation()
    //   .then((res) => {
    //     this.map.moveCamera({
    //       target: res.latLng,
    //     });
    //   })
    //   .catch((error) => {
    //     console.log(error);

    //     this.utils.showAlert(
    //       this.translateService.instant("Ubicacion desactivada"),
    //       this.translateService.instant("Sin acceso a la ubicacion no se visualizara la localización")
    //     );
    //   });

    // this.map
    //   .one(GoogleMapsEvent.MAP_READY)
    //   .then(async () => {
    //     this.map.setMapTypeId("MAP_TYPE_SATELLITE");
    //     this.map.setMyLocationEnabled(true);
    //     this.map.setMyLocationButtonEnabled(true);

    //     this.map.on(GoogleMapsEvent.MAP_CLICK).subscribe((res) => {
    //       // this.SetNewMarker(res);
    //       // this.SetValuesOnForm(res);
    //     });
    //   })
    //   .catch((error) => {
    //     console.log(error);

    //     this.utils.showAlert(
    //       this.translateService.instant("Ubicacion desactivada"),
    //       this.translateService.instant("Sin acceso a la ubicacion no se podra actualizar la localización")
    //     );
    //   });
  }
  SearchLocalizacion() {
    this.InputValue(this.direccionSeleccionada);
  }

  async getCategories() {
    try {
      let res = await this.api
        .getEntity("ChanelsCategories")
        .toPromise()
        .catch((err) => {
          throw new Error(err);
        });

      console.log("RESPONSE =>");

      console.log(res);

      if (res.status === "ok") {
        this.temas = res.data;
      } else {
        throw new Error(res);
      }
    } catch (error) {
      this.utils.showAlert(this.translateService.instant("¡Vaya!"),
      this.translateService.instant("Ha ocurrido un error en el servidor"));

      console.log(error);
    }
  }
  InputValue(event) {
    console.log(event);

    let InputValue = event;

    if (InputValue.trim() != "") {
      this.SetLatLong(event);
    }
  }

  SetLatLong(value) {
    let options: NativeGeocoderOptions = {
      useLocale: true,
      maxResults: 5,
    };

    this.geo
      .forwardGeocode(value, options)
      .then((result: NativeGeocoderResult[]) => {
        // console.log(
        //   "The coordinates are latitude=" +
        //     result[0].latitude +
        //     " and longitude=" +
        //     result[0].longitude
        // );
        console.log(result);

        this.ShowLocation(result);
      })
      .catch((error: any) => console.log(error));
  }
  async ShowLocation(result) {
    if (this.markerMaps !== undefined && this.markerMaps !== null) {
      // this.markerMaps.destroy();// TODO
    }
    let loc = this.SetLocalizacionValue(result[0]);
    // this.SearchLocalizacionSend = loc;
    let Selectedposition: any = {
      lat: result[0].latitude,
      lng: result[0].longitude,
    };

    this.map.setCamera({
      coordinate: {
        lat: result[0].latitude,
        lng: result[0].longitude,
      },
    });

await this.map.addMarker({ coordinate: Selectedposition,
      iconUrl: environment.domainUrl + "storage/QTYH7JKuCqj64pYlepLvNIozVJ4cboTsRjrPGpxz.png",
        iconSize: {
          width: 40,
          height: 60,
        },
      title: loc,});
    // this.markerMaps.showInfoWindow();
  }

  SetLocalizacionValue(resultados: any): string {
    let Localizacion = "";

    let fields = [
      "thoroughfare",
      "subLocality",
      "locality",
      "subAdministrativeArea",
      "administrativeArea",
      "countryName",
    ];
    // this.SearchLocalizacionSend = loc;

    let localizationObject = resultados;

    // fields.forEach((element) => {
    //   if (!this.IsEmptyString(localizationObject[element])) {
    //     delete localizationObject[element];
    //   }
    // });
    this.SearchLocalizacionSend = localizationObject;
    let Values = [];

    fields.forEach((element) => {
      if (!this.IsEmptyString(resultados[element])) {
        Values.push(resultados[element]);
      }
    });

    // let filteredArr = Values.filter((value, index, array) => {
    //   if (array.indexOf(index) === array.lastIndexOf(value)) {

    //   }
    //   return
    // });

    Values.forEach((element) => {
      if (!this.IsEmptyString(element)) {
        Localizacion += "," + element;
      }
    });

    if (Localizacion.startsWith(",")) {
      Localizacion = Localizacion.substring(1);
    }

    return Localizacion;
  }

  IsEmptyString(myString: string) {
    if (typeof myString == "undefined" && myString !== null) {
      return false;
    }

    console.log(myString);

    let trimmedString = myString.trim();
    if (trimmedString.length === 0) {
      return true;
    } else {
      return false;
    }
  }
}

// draw() {
//   var image = (document.getElementById("image-357") as HTMLImageElement );
//   // var canvas = document.createElement("canvas");
//   var canvas = document.getElementById("canva-357") as HTMLCanvasElement;

//   // canvas.appendChild(image);
//   var circleCtx = canvas.getContext("2d");
//   circleCtx.save()
//   circleCtx.beginPath()
//   // circleCtx.arc(image.width/2,image.height/2 , 50, 0, Math.PI * 2, false)
//   circleCtx.arc(image.width / 2, image.height / 2, Math.min(image.width, image.height) / 2, 0, 2 * Math.PI)
//   circleCtx.strokeStyle = '#2465D3'
//   circleCtx.stroke()
//   circleCtx.clip()
//   circleCtx.drawImage(image, 0, 0)
//   circleCtx.restore()

//   var roundedImage = canvas.toDataURL();
//   console.log(roundedImage);

// }
