import { Component, OnInit } from "@angular/core";
import { SocialLogin } from "@martinbuezas/nativescript-social-login";

const GOOGLE_SERVER_CLIENT_ID = "";
const GOOGLE_IOS_CLIENT_ID = "";

@Component({
  selector: "Home",
  templateUrl: "./home.component.html",
  styles: [`
    .h1 { font-size: 21; }
    .p { font-size: 16; }
  `]
})
export class HomeComponent implements OnInit {
  user: any = null;
  private sl: SocialLogin = SocialLogin.getInstance();

  constructor() {}

  ngOnInit(): void {}

  loginWithGoogle() {
    this.sl.loginWithGoogle({
        requestServerAuthCode: true,
        serverClientId: GOOGLE_SERVER_CLIENT_ID,
        iosClientId: GOOGLE_IOS_CLIENT_ID,
      })
      .then((result) => {
        this.user = result;
        console.log("USER", result);
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  }

  loginWithFacebook() {
    this.sl.loginWithFacebook()
      .then((result) => {
        this.user = result;
        console.log("USER", result);
      })
      .catch((error) => {
        console.log("ERROR", error);
      });
  }

  logout() {
    this.sl.logout()
      .then(() => this.user = null)
      .catch((error) => console.log("ERROR", error));
  }
}
