import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { ApiService } from "src/app/services/api.service";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-modal-share",
  templateUrl: "./modal-share.page.html",
  styleUrls: ["./modal-share.page.scss"],
})
export class ModalSharePage implements OnInit {
  post_id;
  post;
  chanels: any;
  IsLoading: boolean = true;
  NoGroups: boolean = false;
  comment: string = "";
  ShareOnChanels: boolean = false;

  constructor(
    private apiService: ApiService,
    private mcontrol: ModalController
  ) {}

  async ngOnInit() {
    this.post_id = this.post.id;
    await this.innitPage();
  }
  async innitPage() {
    await this.getChanels().then(() => {
      this.IsLoading = false;
    });
  }
  async getChanels() {
    try {
      let res = await this.apiService.getEntity("Chanels").toPromise();
      console.log("RESPONSE: ");
      if (res.status === "ok") {
        console.log(res);
        this.setChanel(res);
      }
    } catch (error) {
      console.log(error);
    }
  }

  SharePost(id_chanel) {
    console.log("Se compartira en el grupo");

    console.log(id_chanel);

    let data = {
      id_chanel: id_chanel,
      id_post: this.post_id,
      comment: this.comment,
      Ongroup: true,
    };
    this.dismiss(data);
  }

  ShareInApps() {
    console.log("Se compartira en  redes");
    let data = {
      image: this.post.archivo,
      Ongroup: false,
      post:this.post,
    };
    this.dismiss(data);
  }

  setChanel(res) {
    for (let x = 0; x < res.OtherChanels.length; x++) {
      const element = res.OtherChanels[x];

      if (element.private == 0) {
        res.OwnChanels.push(element);
      }
    }

    this.chanels = res.OwnChanels;

    this.chanels.length < 1 ? (this.NoGroups = true) : (this.NoGroups = false);
  }

  dismiss(data) {
    this.mcontrol.dismiss(data);
  }

  ShareOnGroups(){
    this.ShareOnChanels=true;
  }
}
