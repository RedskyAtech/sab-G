import { User } from './../../models/user.model';
import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Color } from '@nativescript/core';
import { TextField } from '@nativescript/core';
import { RouterExtensions } from '@nativescript/angular';
import { UserService } from '~/app/services/user.service';
import { Page } from '@nativescript/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as localstorage from 'nativescript-localstorage';
import * as Toast from 'nativescript-toast';
import { openApp } from 'nativescript-open-app';
import * as utils from '@nativescript/core/utils';
import { Values } from '~/app/values/values';
import { slideInAnimation } from '~/app/route-animation';
import { images } from '~/app/assets/index';

declare const android: any;
declare const CGSizeMake: any;

@Component({
  selector: 'ns-faq',
  moduleId: module.id,
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  animations: [slideInAnimation],
})
export class FaqComponent implements OnInit, AfterContentInit {
  assets = {
    instaIcon: images.INSTA_ICON,
    fbIcon: images.FB_ICON
  }

  // isRendering: boolean;
  isLoading: boolean;
  questionText: string;
  questionHint: string;
  questionBorderColor: string;
  questionBorderWidth: string;
  renderingTimeout;
  token: string;
  user: User;
  query: string = '';
  pageNo: number = 1;
  items: number = 10;
  headers: HttpHeaders;
  dataForBadge: any = { showCartBadge: false, numberOnBadge: '' };
  fbIcon: string = this.assets.fbIcon;
  instaIcon: string = this.assets.instaIcon;

  constructor(
    private routerExtensions: RouterExtensions,
    private userService: UserService,
    private page: Page,
    private http: HttpClient,
  ) {
    this.page.actionBarHidden = true;
    // this.isRendering = true;
  }
  ngAfterContentInit(): void { }
  ngOnInit(): void {
    this.isLoading = false;
    this.questionText = '';
    this.questionHint = 'Enter your question here';
    this.questionBorderColor = '#707070';
    this.questionBorderWidth = '1';
    this.userService.headerLabel('FAQ');
    this.userService.activeScreen('faq');
    this.user = new User();
    this.token = '';
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

  // onHeaderLoaded(args: any) {
  //   const headerCard = <any>args.object;
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
  //   const footerCard = <any>args.object;
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

  public questionTextField(args) {
    const textField: TextField = args.object;
    this.questionText = textField.text;
  }

  onSubmitClick() {
    if (this.questionText == '') {
      alert('Please enter your question.');
    } else {
      this.user.question = this.questionText;
      this.user.userId = localstorage.getItem('userId');
      console.log(this.user);
      this.isLoading = true;
      this.http
        .post(Values.BASE_URL + 'faq', this.user, {
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': this.token,
          },
        })
        .subscribe(
          (res: any) => {
            if (res != null && res != undefined) {
              if (res.isSuccess == true) {
                this.isLoading = false;
                this.routerExtensions.navigate(['/menu']);
                Toast.makeText('Your query is successfully submitted.', 'long').show();
              }
            }
          },
          (error) => {
            this.routerExtensions.navigate(['/menu']);
            this.isLoading = false;
            console.log('ERROR::::', error.error.error);
          },
        );
    }
  }

  onFacebook() {
    // openApp("https://www.facebook.com/SabG-102840824401535/", false);
    // if (!installed) {
    utils.openUrl('https://www.facebook.com/SabG-102840824401535/');
    // }
  }

  onInstagram() {
    utils.openUrl('https://instagram.com/sabginfo?igshid=3guootxr5xlw');
  }

  private getCart() {
    this.isLoading = true;
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
