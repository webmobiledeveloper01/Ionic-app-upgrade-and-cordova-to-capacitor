import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  public _storage: Storage | null = null;
  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    const storage = await this.storage?.create();
    this._storage = storage;
    const currenttoken = await this.get("auth-token");
    return currenttoken;
  }


  async get(key: string) {
    const getdata = await this._storage?.get(key);
    return getdata;
  }

  async set(key: string, value: any) {
    const setdata = await this._storage?.set(key, value);
    return setdata;
  }

  async remove(key: string) {
    const remove = await this._storage?.remove(key);
    return remove;
  }

  async clearStore() {
    await this._storage?.remove('userData');
    const clear = await this._storage?.clear();
    return clear;
  }
}
