import { GoogleMap } from "@capacitor/google-maps";
import { LatLng } from "@capacitor/google-maps/dist/typings/definitions";

export interface MapState {
  Map?: GoogleMap;
  PositionSelected: LatLng;
  PositionName: string;
  MapIsVisible: boolean;
}
