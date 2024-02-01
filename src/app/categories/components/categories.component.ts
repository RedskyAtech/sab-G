import { Component, OnInit, AfterContentInit } from '@angular/core';
import { Color } from '@nativescript/core';
import { RouterExtensions } from '@nativescript/angular';
import { UserService } from '~/app/services/user.service';
import { Page } from '@nativescript/core';
import * as localstorage from 'nativescript-localstorage';
import { Values } from '~/app/values/values';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { slideInAnimation } from '~/app/route-animation';

@Component({
  selector: 'ns-categories',
  moduleId: module.id,
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  animations: [slideInAnimation],
})
export class CategoriesComponent implements OnInit, AfterContentInit {
  // isRendering: boolean;
  isLoading: boolean;
  renderingTimeout;
  categories;
  offerHeading: string;
  offer: string;
  selectedPage: number;
  token: string;
  isCategories: boolean;
  categoryMessage: string;
  query: string;
  pageNo: number;
  items: number;
  headers: HttpHeaders;
  dataForBadge: any = { showCartBadge: false, numberOnBadge: '' };

  constructor(
    private routerExtensions: RouterExtensions,
    private userService: UserService,
    private page: Page,
    private http: HttpClient,
  ) {
    this.page.actionBarHidden = true;
    // this.isRendering = true;

    this.page.on('navigatedTo', (data) => {
      if (data.isBackNavigation) {
        this.userService.headerLabel('All categories');
        this.userService.showBack('visible');
        this.userService.activeScreen('categories');
      }
    });
  }
  ngAfterContentInit(): void { }
  ngOnInit(): void {
    this.categories = [];
    this.isLoading = false;
    this.userService.headerLabel('All categories');
    this.userService.showBack('visible');
    this.userService.activeScreen('categories');
    this.selectedPage = 0;
    this.token = '';
    this.isCategories = true;
    this.categoryMessage = '';
    this.query = '';
    this.pageNo = 1;
    this.items = 10;
    if (localstorage.getItem('token') != null && localstorage.getItem('token') != undefined) {
      this.token = localstorage.getItem('token');
      this.headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': this.token,
      });
      this.getCategories();
      this.getCart();
    }
  }

  // protected get shadowColor(): Color {
  //   return new Color('#888888');
  // }

  // protected get shadowOffset(): number {
  //   return 2.0;
  // }

  // onCategoryLoaded(args: any) {
  //   const categoryCard:any = args.object;
  //   setTimeout(() => {
  //     if (categoryCard.android) {
  //       const nativeGridMain = categoryCard.android;
  //       const shape = new android.graphics.drawable.GradientDrawable();
  //       shape.setShape(android.graphics.drawable.GradientDrawable.RECTANGLE);
  //       shape.setColor(android.graphics.Color.parseColor('white'));
  //       shape.setCornerRadius(20);
  //       nativeGridMain.setBackgroundDrawable(shape);
  //       nativeGridMain.setElevation(5);
  //     } else if (categoryCard.ios) {
  //       const nativeGridMain = categoryCard.ios;
  //       nativeGridMain.layer.shadowColor = this.shadowColor.ios.CGColor;
  //       nativeGridMain.layer.shadowOffset = CGSizeMake(0, this.shadowOffset);
  //       nativeGridMain.layer.shadowOpacity = 0.5;
  //       nativeGridMain.layer.shadowRadius = 5.0;
  //       nativeGridMain.layer.shadowRadius = 5.0;
  //     }
  //     // this.changeDetector.detectChanges();
  //   }, 10);
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

  getCategories() {
    this.query = `pageNo=${this.pageNo}&items=${this.items}&status=active`;
    this.isLoading = true;
    this.http
      .get(Values.BASE_URL + 'categories?' + this.query, {
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': this.token,
        },
      })
      .subscribe(
        (res: any) => {
          if (res != null && res != undefined) {
            if (res.isSuccess == true) {
              console.trace(res);
              if (res.data.category.length > 0) {
                this.isCategories = true;
                this.categoryMessage = '';
                for (let i = 0; i < res.data.category.length; i++) {
                  const name =
                    res.data.category[i].name.charAt(0).toUpperCase() +
                    res.data.category[i].name.slice(1);
                  this.categories.push({
                    id: res.data.category[i]._id,
                    name: name,
                    imageUrl: res.data.category[i].image.url,
                    thumbnail: res.data.category[i].thumbnail,
                    resizeUrl: res.data.category[i].resize_url,
                    resizeThumbnail: res.data.category[i].resize_thumbnail,
                  });
                }
                this.isLoading = false;
                this.pageNo = this.pageNo + 1;
                this.getCategories();
              } else {
                if (this.pageNo == 1) {
                  this.isCategories = false;
                  this.categoryMessage = 'There is no categories.';
                }
              }
              this.isLoading = false;
            }
          }
        },
        (error) => {
          this.isLoading = false;
          console.log('ERROR::::', error.error.error);
        },
      );
  }

  onCategoryClick(item: any) {
    this.routerExtensions.navigate(['/products'], {
      queryParams: {
        categoryName: item.name,
        categoryId: item.id,
      },
    });
    localstorage.setItem('categoryId', item.id);
  }

  private getCart() {
    this.isLoading = true;
    // console.log(localstorage.getItem('cartId'));
    this.query = `_id=${localstorage.getItem('cartId')}&pageNo=${this.pageNo}&items=${this.items}`;
    this.http
      .get(Values.BASE_URL + 'carts?' + this.query, {
        headers: this.headers,
      })
      .subscribe(
        (res: any) => {
          if (res != null && res != undefined) {
            if (res.isSuccess == true) {
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
