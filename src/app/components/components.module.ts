import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AppChatItemComponent } from "./app-chat-item/app-chat-item.component";
import { AppChatGroupComponent } from "./app-chat-group/app-chat-group.component";
import { IonicModule } from "@ionic/angular";
import { RouterModule } from "@angular/router";
import { AppChatFooterComponent } from "./app-chat-footer/app-chat-footer.component";
import { FormsModule } from "@angular/forms";
import { AppChatHeaderComponent } from "./app-chat-header/app-chat-header.component";
import { AppLoadingComponent } from "./app-loading/app-loading.component";
import { AppNotificationItemComponent } from "./app-notification-item/app-notification-item.component";
import { AppHeaderComponent } from "./app-header/app-header.component";
import { AppAdBannerComponent } from "./app-ad-banner/app-ad-banner.component";
import { AppSelectUserComponent } from "./app-select-user/app-select-user.component";
import { AppChanelComponent } from "./app-chanel/app-chanel.component";
import { AppGroupPostComponent } from "./app-group-post/app-group-post.component";
import { AppQuestionItemComponent } from "./app-question-item/app-question-item.component";
import { AppRecetasComponent } from "./app-recetas/app-recetas.component";
import { AppUserFollowerComponent } from "./app-user-follower/app-user-follower.component";
import { AppHomePostComponent } from "./app-home-post/app-home-post.component";
import { GroupItemComponent } from "./group-item/group-item.component";
import { TranslateModule } from "@ngx-translate/core";

const COMPONENTS = [
  AppRecetasComponent,
  GroupItemComponent,
  AppUserFollowerComponent,
  AppHomePostComponent,
  AppChatItemComponent,
  AppChanelComponent,
  AppChatGroupComponent,
  AppChatFooterComponent,
  AppChatHeaderComponent,
  AppLoadingComponent,
  AppNotificationItemComponent,
  AppHeaderComponent,
  AppSelectUserComponent,
  AppQuestionItemComponent,
  AppAdBannerComponent,
  AppGroupPostComponent,
];

@NgModule({
  imports: [CommonModule, IonicModule.forRoot(), RouterModule, FormsModule, TranslateModule],
  declarations: [COMPONENTS],
  exports: [COMPONENTS, TranslateModule],
})
export class ComponentsModule {}
