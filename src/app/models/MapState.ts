import { GoogleMap } from "@capacitor-community/google-maps";

export interface MapState {
  Map?: GoogleMap;
  PositionSelected: any;
  PositionName: string;
  MapIsVisible: boolean;
}
