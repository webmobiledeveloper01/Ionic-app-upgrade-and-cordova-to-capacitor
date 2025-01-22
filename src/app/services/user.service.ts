import { Injectable } from "@angular/core";
import { User } from "../models/User";
import { ApiService } from "./api.service";

@Injectable({
  providedIn: "root",
})
export class UserService {
  user?: User;

  constructor(private api: ApiService) {}

  // Logout() {
  //   this.user=undefined;

  // }

  public async setUser(user: User) {
    this.user = user;
    console.log("Setting=>");
    console.log(user);
    this.api.userChanges.next(this.user);
  }

  public async getUser() {
    if (typeof this.user !== "undefined") {
      console.log("User exist, returning user...", this.user);
      return this.user;
    } else {
      console.log("User does not exist, setting user...");

      await this.setUserFromDB();
      console.log("user setted=>");

      return this.user;
    }
  }

  public async setUserFromDB() {
    let res = await this.api.getEntity("user").toPromise();

    this.user = res;
  }

  logout() {
    this.user = undefined;
  }
}
