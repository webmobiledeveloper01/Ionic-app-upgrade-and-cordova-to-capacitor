import { Platform } from "@ionic/angular";
import { Injectable } from "@angular/core";
// import { Storage } from "@ionic/storage-angular";
import { BehaviorSubject } from "rxjs";
import { StorageService } from "./storage.service";
// import { User } from "../models/User";

const TOKEN_KEY = "auth-token";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  public authenticationState = new BehaviorSubject("");
  constructor(private storage: StorageService, private plt: Platform) {
    this.checkToken();
  }




  async checkToken() {
    const res = await this.storage.get(TOKEN_KEY);
      console.log(res);
      if (res) {
        this.authenticationState.next(res);
      }
      return res ?? false;
  }

  

  public login(token): Promise<void> {
    return this.storage.set(TOKEN_KEY, token).then(() => {
      this.authenticationState.next(token);
    });
  }

  public logout(): Promise<void> {
    return this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next("logout");
    });
  }

  public isAuthenticated(): string {
    return this.authenticationState.value;
  }
}
