import { User } from './../../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Color } from '@nativescript/core';
import { TextField } from '@nativescript/core';
import { RouterExtensions } from '@nativescript/angular';
import { UserService } from '~/app/services/user.service';
import { Page } from '@nativescript/core';
import { Values } from '~/app/values/values';
import { slideInAnimation } from '~/app/route-animation';
import { images } from '~/app/assets/index';

declare const android: any;
declare const CGSizeMake: any;

@Component({
  selector: 'ns-forgotPassword',
  moduleId: module.id,
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  animations: [slideInAnimation],
})
export class ForgotPasswordComponent implements OnInit, AfterContentInit {
  assets = {
    logoIcon: images.LOGO_ICON,
    logoTransparentIocn: images.LOGO_TRANSPARENT_ICON,
    userIcon: images.USER_ICON,
    logoTransparentIcon: images.LOGO_TRANSPARENT_ICON,

  }

  // isRendering: boolean;
  isLoading: boolean;
  mobileText: string;
  heading: string;
  mobileHint: string;
  sendOtpButton: string;
  forgotPassword: string;
  renderingTimeout;
  mobileBorderColor: string;
  mobileBorderWidth: string;
  user: User;
  logoIcon: string = this.assets.logoIcon;
  logoTransperentIcon: string = this.assets.logoTransparentIocn;
  userIcon: string = this.assets.userIcon;

  constructor(
    private routerExtensions: RouterExtensions,
    private userService: UserService,
    private page: Page,
    private http: HttpClient,
  ) {
    this.page.actionBarHidden = true;
    // this.isRendering = true;
    this.isLoading = false;
    this.mobileText = '';
    this.heading = 'Forgot Password';
    this.mobileHint = 'Enter your mobile number';
    this.sendOtpButton = 'Send OTP';
    // this.userService.showFooter(false);
    // this.userService.showHeader(false);
    this.mobileBorderColor = '#707070';
    this.mobileBorderWidth = '1';
    this.user = new User();
  }
  ngAfterContentInit(): void {
    // this.renderingTimeout = setTimeout(() => {
    //     this.isRendering = true;
    // }, 5000)
  }
  ngOnInit(): void { }

  // protected get shadowColor(): Color {
  //   return new Color('#888888');
  // }

  // protected get shadowOffset(): number {
  //   return 2.0;
  // }

  // onLoginLoaded(args: any) {
  //   const loginCard = <any>args.object;
  //   setTimeout(() => {
  //     if (loginCard.android) {
  //       const nativeGridMain = loginCard.android;
  //       const shape = new android.graphics.drawable.GradientDrawable();
  //       shape.setShape(android.graphics.drawable.GradientDrawable.RECTANGLE);
  //       shape.setColor(android.graphics.Color.parseColor('white'));
  //       shape.setCornerRadius(50);
  //       nativeGridMain.setBackgroundDrawable(shape);
  //       nativeGridMain.setElevation(10);
  //     } else if (loginCard.ios) {
  //       const nativeGridMain = loginCard.ios;
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
    this.mobileBorderColor = '#23A6DB';
    this.mobileBorderWidth = '2';
  }

  onSendOtpClick() {
    if (this.mobileText == '') {
      alert('Please enter mobile number.');
    } else if (this.mobileText.length < 10) {
      alert('Mobile number should be of ten digits.');
    } else {
      this.isLoading = true;
      this.user.phone = this.mobileText;
      this.http.post(Values.BASE_URL + 'users/forgotPassword', this.user).subscribe(
        (res: any) => {
          if (res != '' && res != undefined) {
            if (res.isSuccess == true) {
              // console.log(res);
              this.isLoading = false;
              this.routerExtensions.navigate(['/setPassword'], {
                queryParams: {
                  token: res.data.token,
                  phone: this.mobileText,
                },
                clearHistory: true,
              });
            }
          }
        },
        (error) => {
          this.isLoading = false;
          if (error.error.error == undefined) {
            alert('May be your network connection is low.');
          } else {
            alert(error.error.error);
          }
        },
      );
    }
  }

  onCancel() {
    this.routerExtensions.navigate(['/login']);
  }
}
