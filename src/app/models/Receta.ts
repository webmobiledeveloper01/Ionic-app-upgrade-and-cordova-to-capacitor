import { PasoReceta } from "./PasoReceta";
import { Ingrediente } from "./Ingrediente";

export interface Receta {
  id?: number;
  name: string;
  time: string;
  eaters: string;
  ingredients: Ingrediente[];
  steps: PasoReceta[];
  notes: string;
  url: string;
  location: string;
  serving_name?:string;
  tiempo_preparacion?:string;
}
