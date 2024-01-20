import { Component, OnInit } from "@angular/core";
import { NavController, Platform } from "@ionic/angular";
import { ApiService } from "src/app/services/api.service";
import { AuthenticationService } from "src/app/services/authentication.service";
import { UtilitiesService } from "src/app/services/utilities.service";

@Component({
  selector: "app-answer-question",
  templateUrl: "./answer-question.page.html",
  styleUrls: ["./answer-question.page.scss"],
})
export class AnswerQuestionPage implements OnInit {
  question;
  user;
  isLoading: boolean = true;
  comentario = "";
  constructor(
    private api: ApiService,
    private utils: UtilitiesService,
    private platform: Platform,
    private nav: NavController
  ) {}

  async ngOnInit() {
    try {
      await this.getUser();
      this.question = history.state.question;

      if (this.question == undefined || this.question == null) {
        console.log("question is not defined");
        window.history.back();
      } else {
        console.log(this.question);
        this.isLoading = false;
      }
    } catch (error) {}
  }
  async getUser() {
    this.user = await this.api.getEntity("user").toPromise();
  }

  displayTextArea() {
    let element = document.getElementById("setDisplay");

    console.log(element.classList);

    if (element.classList.contains("slide-in-fwd-bottom")) {
      element.style.display = "none";
      element.classList.remove("slide-in-fwd-bottom");
    } else {
      element.style.display = "block";
      element.classList.toggle("slide-in-fwd-bottom");
    }

    console.log(element.classList);

    // element.style.display = "none"
    //   ? (element.style.display = "block")
    //   : (element.style.display = "none");
  }
  private async onBack() {
    this.nav.navigateBack("/map");
  }
  async answerQuestion() {
    console.log("this.comentario");

    console.log(this.comentario);
    if (this.comentario != "") {
      let params = {
        pregunta: this.question,
        comentario: this.comentario,
      };
      let res = await this.api.AnswerQuestion(params).toPromise();
      console.log(res);
      this.api.questionChange.next();
      window.history.back();
      this.utils.showToast(res.message);
    }
  }

  back() {
    this.nav.back();
  }
}
