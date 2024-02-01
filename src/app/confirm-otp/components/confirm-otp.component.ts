import { HttpClient } from '@angular/common/http';
import {
  Component,
  OnInit,
  AfterContentInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { Color } from '@nativescript/core';
import { TextField } from '@nativescript/core';
import { RouterExtensions } from '@nativescript/angular';
import { UserService } from '~/app/services/user.service';
import { Page } from '@nativescript/core';
import { User } from '~/app/models/user.model';
import { ActivatedRoute } from '@angular/router';
import { Values } from '~/app/values/values';
import * as Toast from 'nativescript-toast';
import { slideInAnimation } from '~/app/route-animation';
import { images } from '~/app/assets/index';

@Component({
  selector: 'ns-confirmOtp',
  moduleId: module.id,
  templateUrl: './confirm-otp.component.html',
  styleUrls: ['./confirm-otp.component.scss'],
  animations: [slideInAnimation],
})
export class ConfirmOtpComponent implements OnInit, AfterContentInit, AfterViewInit {
  @ViewChild('textField1', { static: false }) textField1: ElementRef;
  @ViewChild('textField2', { static: false }) textField2: ElementRef;
  @ViewChild('textField3', { static: false }) textField3: ElementRef;
  @ViewChild('textField4', { static: false }) textField4: ElementRef;

  assets = {
    logoIcon: images.LOGO_ICON,
    logoTransIcon: images.LOGO_TRANSPARENT_ICON,
  }

  // isRendering: boolean;
  isLoading: boolean;
  otp1Text: string;
  otp2Text: string;
  otp3Text: string;
  otp4Text: string;
  heading: string;
  mobileHint: string;
  nextButton: string;
  forgotPassword: string;
  renderingTimeout;
  mobileBorderColor: string;
  mobileBorderWidth: string;
  textfield1: TextField;
  textfield2: TextField;
  textfield3: TextField;
  textfield4: TextField;
  user: User;
  from: string;

  logoIcon: string = this.assets.logoIcon;
  logoTransperentIcon: string = this.assets.logoTransIcon;

  constructor(
    private routerExtensions: RouterExtensions,
    private route: ActivatedRoute,
    private userService: UserService,
    private page: Page,
    private http: HttpClient,
  ) {
    this.page.actionBarHidden = true;
    this.isLoading = false;
    this.otp1Text = '';
    this.otp2Text = '';
    this.otp3Text = '';
    this.otp4Text = '';
    this.heading = 'Enter your OTP code';
    this.mobileHint = 'Enter your mobile number';
    this.nextButton = 'Next';
    this.mobileBorderColor = '#707070';
    this.mobileBorderWidth = '1';
    this.user = new User();
    this.from = '';
  }
  ngAfterContentInit(): void {
    // this.renderingTimeout = setTimeout(() => {
    //     this.isRendering = true;
    // }, 5000)
  }
  ngOnInit(): void { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.textfield1 = this.textField1.nativeElement;
      this.textfield2 = this.textField2.nativeElement;
      this.textfield3 = this.textField3.nativeElement;
      this.textfield4 = this.textField4.nativeElement;
      this.textfield1.focus();
    }, 10);
  }

  onBack() {
    this.routerExtensions.back();
  }

  // protected get shadowColor(): Color {
  //   return new Color('#888888');
  // }

  // protected get shadowOffset(): number {
  //   return 2.0;
  // }

  // onLoginLoaded(args: any) {
  //   const loginCard:any = args.object;
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

  public otp1Field(args) {
    const textField: TextField = args.object;
    this.otp1Text = textField.text;
    if (this.otp1Text.length == 0) {
      this.textfield1.focus();
    } else {
      this.textfield2.focus();
    }
  }

  public otp2Field(args) {
    const textField: TextField = args.object;
    this.otp2Text = textField.text;
    if (this.otp2Text.length == 0) {
      this.textfield2.focus();
    } else {
      this.textfield3.focus();
    }
  }

  public otp3Field(args) {
    const textField: TextField = args.object;
    this.otp3Text = textField.text;
    if (this.otp3Text.length == 0) {
      this.textfield3.focus();
    } else {
      this.textfield4.focus();
    }
  }

  public otp4Field(args) {
    const textField: TextField = args.object;
    this.otp4Text = textField.text;
    if (this.otp4Text.length == 0) {
      this.textfield4.focus();
    }
  }

  onNextClick() {
    if (this.otp1Text == '' || this.otp2Text == '' || this.otp3Text == '' || this.otp4Text == '') {
      alert('Please enter correct otp.');
    } else {
      this.route.queryParams.subscribe((params) => {
        this.user.phone = params['phone'];
        this.from = params['from'];
      });
      this.isLoading = true;
      this.user.otp = this.otp1Text + this.otp2Text + this.otp3Text + this.otp4Text;
      console.log(this.user);
      this.http.post(Values.BASE_URL + 'users/verifyUser', this.user).subscribe(
        (res: any) => {
          if (res != '' && res != undefined) {
            if (res.isSuccess == true) {
              this.isLoading = false;
              localStorage.setItem('regToken', res.data.token);
              if (this.from == 'login') {
                Toast.makeText('User verified successfully', 'long').show();
                this.routerExtensions.back();
              } else {
                Toast.makeText('User registered successfully', 'long').show();
                this.routerExtensions.navigate(['/login']);
              }
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
    }
  }

  onResendOtpClick() {
    alert('resend otp clicked.');
  }
}
