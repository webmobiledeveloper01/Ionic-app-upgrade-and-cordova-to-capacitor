import { GoogleMap } from "@capacitor/google-maps";

export interface MapState {
  Map?: GoogleMap;
  PositionSelected: any;
  PositionName: string;
  MapIsVisible: boolean;
}
