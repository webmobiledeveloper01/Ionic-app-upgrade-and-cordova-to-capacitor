import { ILatLng } from "@ionic-native/google-maps";
import { GoogleMaps,GoogleMap } from "@ionic-native/google-maps";

export interface MapState {
  Map?: GoogleMap;
  PositionSelected: ILatLng;
  PositionName: string;
  MapIsVisible: boolean;
}
