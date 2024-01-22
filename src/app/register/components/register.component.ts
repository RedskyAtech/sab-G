import { User } from "./../../models/user.model";
import { HttpClient } from "@angular/common/http";
import { Component, OnInit, AfterContentInit } from "@angular/core";
import { Color } from "tns-core-modules/color/color";
import { TextField } from '@nativescript/core';
import { RouterExtensions } from "@nativescript/angular";
import { UserService } from "~/app/services/user.service";
import { Page } from "tns-core-modules/ui/page/page";
import { Values } from "~/app/values/values";
import { slideInAnimation } from "~/app/route-animation";
import { images } from "~/app/assets/index";

declare const android: any;
declare const CGSizeMake: any;

@Component({
  selector: "ns-register",
  moduleId: module.id,
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
  animations: [slideInAnimation],
})
export class RegisterComponent implements OnInit, AfterContentInit {
  assets = {
    logoIcon: images.LOGO_ICON,
    logoTransparent: images.LOGO_TRANSPARENT_ICON,
    userIcon: images.USER_ICON,
    lockIcon: images.LOCK_ICON,
    eyeIcon: images.EYE_ICON,
  };

  // isRendering: boolean;
  isLoading: boolean;
  mobileText: string;
  passwordText: string;
  confirmPasswordText: string;
  heading: string;
  mobileHint: string;
  passwordHint: string;
  confirmPasswordHint: string;
  createNow: string;
  registerButton: string;
  forgotPassword: string;
  renderingTimeout;
  mobileBorderColor: string;
  passwordBorderColor: string;
  confirmPasswordBorderColor: string;
  mobileBorderWidth: string;
  passwordBorderWidth: string;
  confirmPasswordBorderWidth: string;
  passwordSecure: boolean;
  confirmPasswordSecure: boolean;
  user: User;

  logoIcon: string = this.assets.logoIcon;
  logoTransparentIcon: string = this.assets.logoTransparent;
  userIcon: string = this.assets.userIcon;
  lockIcon: string = this.assets.lockIcon;
  eyeIcon: string = this.assets.eyeIcon;

  constructor(
    private routerExtensions: RouterExtensions,
    private userService: UserService,
    private page: Page,
    private http: HttpClient
  ) {
    this.page.actionBarHidden = true;
    // this.isRendering = true;
    this.isLoading = false;
    this.mobileText = "";
    this.passwordText = "";
    this.heading = "Sign Up";
    this.mobileHint = "Enter your mobile number";
    this.passwordHint = "Enter your password";
    this.confirmPasswordHint = "Confirm your password";
    this.createNow = " Create Now";
    this.registerButton = "Sign Up";
    this.forgotPassword = "Forgot password?";
    this.userService.showFooter(false);
    this.mobileBorderColor = "#707070";
    this.passwordBorderColor = "#707070";
    this.mobileBorderWidth = "1";
    this.passwordBorderWidth = "1";
    this.confirmPasswordBorderColor = "#707070";
    this.confirmPasswordBorderWidth = "1";
    this.passwordSecure = true;
    this.confirmPasswordSecure = true;
    this.user = new User();
  }
  ngAfterContentInit(): void {}
  ngOnInit(): void {}

  // protected get shadowColor(): Color {
  //   return new Color('#888888');
  // }

  // protected get shadowOffset(): number {
  //   return 2.0;
  // }

  // onRegisterLoaded(args: any) {
  //   const registerCard = <any>args.object;
  //   setTimeout(() => {
  //     if (registerCard.android) {
  //       const nativeGridMain = registerCard.android;
  //       const shape = new android.graphics.drawable.GradientDrawable();
  //       shape.setShape(android.graphics.drawable.GradientDrawable.RECTANGLE);
  //       shape.setColor(android.graphics.Color.parseColor('white'));
  //       shape.setCornerRadius(50);
  //       nativeGridMain.setBackgroundDrawable(shape);
  //       nativeGridMain.setElevation(10);
  //     } else if (registerCard.ios) {
  //       const nativeGridMain = registerCard.ios;
  //       nativeGridMain.layer.shadowColor = this.shadowColor.ios.CGColor;
  //       nativeGridMain.layer.shadowOffset = CGSizeMake(0, this.shadowOffset);
  //       nativeGridMain.layer.shadowOpacity = 0.5;
  //       nativeGridMain.layer.shadowRadius = 5.0;
  //       nativeGridMain.layer.shadowRadius = 5.0;
  //     }
  //     // this.changeDetector.detectChanges();
  //   }, 50);
  // }

  public mobileTextField(args) {
    const textField: TextField = args.object;
    this.mobileText = textField.text;
    this.mobileBorderColor = "#23A6DB";
    this.mobileBorderWidth = "2";
  }

  public passwordTextField(args) {
    const textField: TextField = args.object;
    this.passwordText = textField.text;
    this.passwordBorderColor = "#23A6DB";
    this.passwordBorderWidth = "2";
  }

  public confirmPasswordTextField(args) {
    const textField: TextField = args.object;
    this.confirmPasswordText = textField.text;
    this.confirmPasswordBorderColor = "#23A6DB";
    this.confirmPasswordBorderWidth = "2";
  }

  onRegisterClick() {
    if (this.mobileText == "") {
      alert("Please enter mobile enter.");
    } else if (this.mobileText.length < 10) {
      alert("Mobile number should be of ten digits.");
    } else if (this.passwordText == "") {
      alert("Please enter password.");
    } else if (this.passwordText.length < 6) {
      alert("Password is too short, please enter minimum six characters.");
    } else if (this.confirmPasswordText == "") {
      alert("Please enter confirm password.");
    } else if (this.passwordText != this.confirmPasswordText) {
      alert("Password and confirm password should be same.");
    } else {
      this.isLoading = true;
      this.user.phone = this.mobileText;
      this.user.password = this.passwordText;
      this.http.post(Values.BASE_URL + "users", this.user).subscribe(
        (res: any) => {
          // console.log("res from server:: ",res)
          if (res != "" && res != undefined) {
            if (res.isSuccess == true) {
              this.isLoading = false;
              this.routerExtensions.navigate(["./confirmOtp"], {
                queryParams: {
                  phone: this.mobileText,
                },
                clearHistory: true,
              });
            }
          }
        },
        (error) => {
          this.isLoading = false;
          console.log(error);
          if (error.error.error == undefined) {
            alert("May be your network connection is low.");
          } else {
            alert(error.error.error);
          }
        }
      );
    }
  }

  onLoginClick() {
    this.routerExtensions.navigate(["/login"]);
  }

  onEye() {
    this.passwordSecure = !this.passwordSecure;
  }

  onConfirmEye() {
    this.confirmPasswordSecure = !this.confirmPasswordSecure;
  }
}
