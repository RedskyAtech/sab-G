import { User } from './../../models/user.model';
import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Color } from 'tns-core-modules/color/color';
import { TextField } from '@nativescript/core';
import { RouterExtensions } from '@nativescript/angular';
import { UserService } from '~/app/services/user.service';
import * as Toast from 'nativescript-toast';
import { Page } from 'tns-core-modules/ui/page/page';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as localstorage from 'nativescript-localstorage';
import { Values } from '~/app/values/values';
import { slideInAnimation } from '~/app/route-animation';
import { images } from '~/app/assets/index';

@Component({
  selector: 'ns-changePassword',
  moduleId: module.id,
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
  animations: [slideInAnimation],
})
export class ChangePasswordComponent implements OnInit, AfterContentInit {
  assets = { eyeIcon: images.EYE_ICON }

  // isRendering: boolean;
  isLoading: boolean;
  oldPasswordText: string;
  oldPasswordHint: string;
  oldPasswordBorderColor: string;
  oldPasswordBorderWidth: string;
  oldPasswordSecure: boolean;
  newPasswordText: string;
  newPasswordHint: string;
  newPasswordBorderColor: string;
  newPasswordBorderWidth: string;
  newPasswordSecure: boolean;
  confirmPasswordText: string;
  confirmPasswordHint: string;
  confirmPasswordBorderColor: string;
  confirmPasswordBorderWidth: string;
  confirmPasswordSecure: boolean;
  updatePasswordButton: string;
  forgotPassword: string;
  renderingTimeout;
  user: User;
  query: string = '';
  pageNo: number = 1;
  items: number = 10;
  headers: HttpHeaders;
  dataForBadge: any = { showCartBadge: false, numberOnBadge: '' };
  token: string;
  eyeIcon:string = this.assets.eyeIcon;

  constructor(
    private routerExtensions: RouterExtensions,
    private userService: UserService,
    private page: Page,
    private http: HttpClient,
  ) {
    this.page.actionBarHidden = true;
    // this.isRendering = true;
  }
  ngAfterContentInit(): void {}
  ngOnInit(): void {
    this.isLoading = false;
    this.oldPasswordText = '';
    this.oldPasswordHint = 'Old password';
    this.oldPasswordBorderColor = '#707070';
    this.oldPasswordBorderWidth = '1';
    this.oldPasswordSecure = true;
    this.newPasswordText = '';
    this.newPasswordHint = 'New Password';
    this.newPasswordBorderColor = '#707070';
    this.newPasswordBorderWidth = '1';
    this.newPasswordSecure = true;
    this.confirmPasswordText = '';
    this.confirmPasswordHint = 'Confirm password';
    this.confirmPasswordBorderColor = '#707070';
    this.confirmPasswordBorderWidth = '1';
    this.confirmPasswordSecure = true;
    this.updatePasswordButton = 'Update password';
    this.forgotPassword = 'Forgot password?';
    this.userService.headerLabel('Change Password');
    this.userService.activeScreen('changePassword');
    this.user = new User();
    if (localstorage.getItem('token') != null && localstorage.getItem('token') != undefined) {
      this.token = localstorage.getItem('token');
      this.headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': this.token,
      });
      this.getCart();
    }
  }

  // protected get shadowColor(): Color {
  //   return new Color('#888888');
  // }

  // protected get shadowOffset(): number {
  //   return 2.0;
  // }

  // onChangePasswordLoaded(args: any) {
  //   const changePasswordCard:any = args.object;
  //   setTimeout(() => {
  //     if (changePasswordCard.android) {
  //       const nativeGridMain = changePasswordCard.android;
  //       const shape = new android.graphics.drawable.GradientDrawable();
  //       shape.setShape(android.graphics.drawable.GradientDrawable.RECTANGLE);
  //       shape.setColor(android.graphics.Color.parseColor('white'));
  //       shape.setCornerRadius(20);
  //       nativeGridMain.setBackgroundDrawable(shape);
  //       nativeGridMain.setElevation(10);
  //     } else if (changePasswordCard.ios) {
  //       const nativeGridMain = changePasswordCard.ios;
  //       nativeGridMain.layer.shadowColor = this.shadowColor.ios.CGColor;
  //       nativeGridMain.layer.shadowOffset = CGSizeMake(0, this.shadowOffset);
  //       nativeGridMain.layer.shadowOpacity = 0.5;
  //       nativeGridMain.layer.shadowRadius = 5.0;
  //       nativeGridMain.layer.shadowRadius = 5.0;
  //     }
  //     // this.changeDetector.detectChanges();
  //   }, 50);
  // }

  // onHeaderLoaded(args: any) {
  //   const headerCard:any = args.object;
  //   setTimeout(() => {
  //     if (headerCard.android) {
  //       const nativeGridMain = headerCard.android;
  //       const shape = new android.graphics.drawable.GradientDrawable();
  //       shape.setShape(android.graphics.drawable.GradientDrawable.RECTANGLE);
  //       shape.setColor(android.graphics.Color.parseColor('white'));
  //       shape.setCornerRadius(0);
  //       nativeGridMain.setBackgroundDrawable(shape);
  //       nativeGridMain.setElevation(5);
  //     } else if (headerCard.ios) {
  //       const nativeGridMain = headerCard.ios;
  //       nativeGridMain.layer.shadowColor = this.shadowColor.ios.CGColor;
  //       nativeGridMain.layer.shadowOffset = CGSizeMake(0, this.shadowOffset);
  //       nativeGridMain.layer.shadowOpacity = 0.5;
  //       nativeGridMain.layer.shadowRadius = 5.0;
  //       nativeGridMain.layer.shadowRadius = 5.0;
  //     }
  //     // this.changeDetector.detectChanges();
  //   }, 50);
  // }

  // onFooterLoaded(args: any) {
  //   const footerCard:any = args.object;
  //   setTimeout(() => {
  //     if (footerCard.android) {
  //       const nativeGridMain = footerCard.android;
  //       const shape = new android.graphics.drawable.GradientDrawable();
  //       shape.setShape(android.graphics.drawable.GradientDrawable.RECTANGLE);
  //       shape.setColor(android.graphics.Color.parseColor('white'));
  //       shape.setCornerRadius(0);
  //       nativeGridMain.setBackgroundDrawable(shape);
  //       nativeGridMain.setElevation(5);
  //     } else if (footerCard.ios) {
  //       const nativeGridMain = footerCard.ios;
  //       nativeGridMain.layer.shadowColor = this.shadowColor.ios.CGColor;
  //       nativeGridMain.layer.shadowOffset = CGSizeMake(0, this.shadowOffset);
  //       nativeGridMain.layer.shadowOpacity = 0.5;
  //       nativeGridMain.layer.shadowRadius = 5.0;
  //       nativeGridMain.layer.shadowRadius = 5.0;
  //     }
  //     // this.changeDetector.detectChanges();
  //   }, 50);
  // }

  public oldPasswordTextField(args) {
    const textField: TextField = args.object;
    this.oldPasswordText = textField.text;
    this.oldPasswordBorderColor = '#23A6DB';
    this.oldPasswordBorderWidth = '2';
  }

  public newPasswordTextField(args) {
    const textField: TextField = args.object;
    this.newPasswordText = textField.text;
    this.newPasswordBorderColor = '#23A6DB';
    this.newPasswordBorderWidth = '2';
  }
  public confirmPasswordTextField(args) {
    const textField: TextField = args.object;
    this.confirmPasswordText = textField.text;
    this.confirmPasswordBorderColor = '#23A6DB';
    this.confirmPasswordBorderWidth = '2';
  }

  onUpdatePasswordClick() {
    if (this.oldPasswordText == '') {
      alert('Please enter old password.');
    } else if (this.oldPasswordText.length < 6) {
      alert('Old password should be of six digits.');
    } else if (this.newPasswordText == '') {
      alert('Please enter new password.');
    } else if (this.newPasswordText.length < 6) {
      alert('New password should be of six digits.');
    } else if (this.confirmPasswordText == '') {
      alert('Please enter confirm password.');
    } else if (this.confirmPasswordText.length < 6) {
      alert('Confirm password should be of six digits.');
    } else if (this.confirmPasswordText != this.newPasswordText) {
      alert('New password and confirm password should be same.');
    } else {
      this.isLoading = true;
      this.user.password = this.oldPasswordText;
      this.user.newPassword = this.newPasswordText;
      // if (localstorage.getItem("token") != null && localstorage.getItem("token") != undefined) {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': localstorage.getItem('token'),
      });
      // }
      this.http
        .post(Values.BASE_URL + 'users/changePassword', this.user, {
          headers: headers,
        })
        .subscribe(
          (res: any) => {
            if (res != '' && res != undefined) {
              if (res.isSuccess == true) {
                this.isLoading = false;
                Toast.makeText('Password changed successfully.', 'long').show();
                this.routerExtensions.navigate(['/profile']);
              }
            }
          },
          (error) => {
            this.isLoading = false;
            console.log(error);
            if (error.error.error == undefined) {
              alert('May be your network connection is low.');
            } else {
              alert(error.error.error);
            }
          },
        );
      // Toast.makeText("Password changed successffuly.", "long").show();
      // this.routerExtensions.navigate(['/profile']);
    }
  }

  onCancelClick() {
    // this.routerExtensions.navigate(['/register']);
    // alert("cancel button clicked");
    this.routerExtensions.back();
  }

  // onForgotPassword() {
  //     this.routerExtensions.navigate(['/forgotPassword']);
  // }

  onOldEyeClick() {
    this.oldPasswordSecure = !this.oldPasswordSecure;
  }

  onNewEyeClick() {
    this.newPasswordSecure = !this.newPasswordSecure;
  }

  onConfirmEyeClick() {
    this.confirmPasswordSecure = !this.confirmPasswordSecure;
  }

  private getCart() {
    this.isLoading = true;
    console.log(localstorage.getItem('cartId'));
    this.query = `_id=${localstorage.getItem('cartId')}&pageNo=${this.pageNo}&items=${this.items}`;
    this.http
      .get(Values.BASE_URL + 'carts?' + this.query, {
        headers: this.headers,
      })
      .subscribe(
        (res: any) => {
          if (res != null && res != undefined) {
            if (res.isSuccess == true) {
              this.isLoading = false;
              if (res.data.products.length > 0) {
                let productQuantity: number = 0;
                for (let item of res.data.products) {
                  productQuantity += parseInt(item.quantity);
                }
                this.dataForBadge.showCartBadge = true;
                this.dataForBadge.numberOnBadge = productQuantity;
              }
            }
          }
        },
        (error) => {
          this.isLoading = false;
          console.log('ERROR::::', error.error.error);
        },
      );
  }
}
