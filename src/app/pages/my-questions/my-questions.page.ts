import { Component, OnInit } from "@angular/core";
import { NavController } from "@ionic/angular";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: "app-my-questions",
  templateUrl: "./my-questions.page.html",
  styleUrls: ["./my-questions.page.scss"],
})
export class MyQuestionsPage implements OnInit {
  public questions = [];

  isLoading: boolean = true;

  noQuestions: boolean = false;

  // public questions=[
  //   {
  //     title:"test_Title 1",
  //     img:" assets/imgs/avatartest.png ",

  //   },
  //   {
  //     title:"test_Title 2",
  //     img:" assets/imgs/avatartest.png ",

  //   },
  //   {
  //     title:"test_Title 3",
  //     img:" assets/imgs/avatartest.png ",

  //   },
  //   {
  //     title:"test_Title 4",
  //     img:" assets/imgs/avatartest.png ",

  //   },
  // ]
  constructor(private api: ApiService, private nav: NavController) {}

  async ngOnInit() {
    await this.getQuestions().then(() => {
      this.isLoading = false;
    });

    this.api.questionChange.subscribe(async () => {
      this.isLoading = true;
      await this.getQuestions().then(() => {
        this.isLoading = false;
      });
    });
  }

  back() {
    this.nav.navigateBack("tabs/perfil");
    // window.history.back();
  }

  GotoEdit(value) {
    console.log(value);

    this.nav.navigateForward("/edit-question", {
      state: {
        getQuestion: value,
      },
    });
  }

  async getQuestions() {
    try {
      let res = await this.api.getEntity("question", 1).toPromise();

      console.log(res);

      this.questions = res.data;

      this.questions.length > 0
        ? (this.noQuestions = false)
        : (this.noQuestions = true);
    } catch (error) {}
  }
}
