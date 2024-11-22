import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private _addMensajeEvent: BehaviorSubject<any> = new BehaviorSubject("");

  private _customEvents: Array<{name: string, event: BehaviorSubject<any>}>;


  constructor() { }

  addMensaje(): Observable<any>{
    return this._addMensajeEvent.asObservable();
  }

  /**
   * Adds a new Event or next() the existing with same name.
   * @param name Custom Event Name
   * @param value Custom Event Value
   */
  publish(name: string, value){
    const eventTrigger =  this._customEvents.find(e=>e.name == name);
    if(eventTrigger){
      eventTrigger.event.next(value);
    }
    else{
      this._customEvents.push({
        name, event: new BehaviorSubject(value)
      });
    }
  }


  getCustomEvent(name: string){
    return this._customEvents.find(e=> e.name == name)?.event ?? null;
  }




}
