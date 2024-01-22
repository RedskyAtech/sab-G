import { HttpHeaders, HttpClient } from "@angular/common/http";
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ChangeDetectorRef,
} from "@angular/core";
import { Color } from "tns-core-modules/color/color";
import { RouterExtensions } from "@nativescript/angular";
import { UserService } from "~/app/services/user.service";
import { Page } from "tns-core-modules/ui/page/page";
import { Values } from "~/app/values/values";
import * as localstorage from "nativescript-localstorage";
import { GridLayout } from '@nativescript/core';
import { TextField } from '@nativescript/core';
import { Cart } from "~/app/models/cart.model";
import { Dimensions } from "~/app/models/dimensions.model";
import { Product } from "~/app/models/product.model";
import * as Toast from "nativescript-toast";
import { requestPremissions } from "nativescript-plugin-badge";
import { images } from "~/app/assets/index";
import { Screen } from '@nativescript/core';

declare const android: any;
declare const CGSizeMake: any;

@Component({
  selector: "ns-home",
  moduleId: module.id,
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit, AfterViewInit {
  assets = {
    searchIcon: images.SEARCH_ICON,
    saleImg: images.SALE_IMG,
    sliderImg1: images.SLIDER_ICON_1,
    sliderImg2: images.SLIDER_ICON_2,
    sliderImg3: images.SLIDER_ICON_3,
    sliderImg4: images.SLIDER_ICON_4,
  };

  isRendering: boolean;
  isLoading;
  cart;
  product;
  categories;
  query: string = "";
  pageNo: number;
  items: number;
  offerHeading: string;
  offer: string;
  selectedPage: number;
  sliderImage1: string;
  sliderImage2: string;
  sliderImage3: string;
  sliderImage4: string;
  token: string;
  headers: HttpHeaders;
  isEditable: boolean = false;
  dealsOfDay: any = [];
  oldWeight: number;
  badgeNo: number;
  dataForBadge: any = { showCartBadge: false, numberOnBadge: "" };
  searchIcon: string = this.assets.searchIcon;
  saleImg: string = this.assets.saleImg;
  discountFontSize: number;

  constructor(
    private routerExtensions: RouterExtensions,
    private userService: UserService,
    private page: Page,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {
    this.page.actionBarHidden = true;
    this.page.on("navigatedTo", (data) => {
      if (data.isBackNavigation) {
        this.isLoading = true;
        this.userService.activeScreen("home");
        this.userService.headerLabel("sabG");
        this.userService.showBack("hidden");
        if (
          localstorage.getItem("token") != null &&
          localstorage.getItem("token") != undefined
        ) {
          this.token = localstorage.getItem("token");
          this.headers = new HttpHeaders({
            "Content-Type": "application/json",
            "x-access-token": this.token,
          });
          this.getCart();
          this.isLoading = false;
        }
      }
    });
  }
  @ViewChild("page", { static: false }) pageRef: ElementRef<GridLayout>;

  ngAfterViewInit(): void {}
  ngOnInit(): void {
    const screenWidth = Screen.mainScreen.widthDIPs;
    this.discountFontSize = (3.5 * screenWidth) / 100;

    this.isRendering = true;
    this.cart = new Cart();
    this.product = new Product();
    this.cart.product = new Product();
    this.cart.product.dimensions = new Dimensions();
    this.isLoading = false;
    this.categories = [];
    this.offerHeading = "";
    this.offer = "";
    this.query = "";
    this.pageNo = 1;
    this.items = 10;
    this.selectedPage = 0;
    this.sliderImage1 = this.assets.sliderImg1;
    this.sliderImage2 = this.assets.sliderImg2;
    this.sliderImage3 = this.assets.sliderImg3;
    this.sliderImage4 = this.assets.sliderImg4;
    this.token = "";

    if (
      localstorage.getItem("token") != null &&
      localstorage.getItem("token") != undefined
    ) {
      this.token = localstorage.getItem("token");
      this.headers = new HttpHeaders({
        "Content-Type": "application/json",
        "x-access-token": this.token,
      });
    }
    this.getSlider();

    setInterval(() => {
      setTimeout(() => {
        this.selectedPage++;
      }, 3000);
      if (this.selectedPage == 3) {
        setTimeout(() => {
          this.selectedPage = 0;
        }, 3000);
      }
    }, 3000);
    this.userService.activeScreen("home");
    this.userService.headerLabel("sabG");
    this.userService.showBack("hidden");
  }

  // protected get shadowColor(): Color {
  //   return new Color('#888888');
  // }

  // protected get shadowOffset(): number {
  //   return 2.0;
  // }

  getCategories() {
    this.http
      .get(
        Values.BASE_URL +
          "categories?pageNo=${this.pageNo}&items=${this.items}&status=active",
        {
          headers: {
            "Content-Type": "application/json",
            "x-access-token": this.token,
          },
        }
      )
      .subscribe(
        (res: any) => {
          // console.log('res from categories in home: ', res);
          // console.log('length of category data: ', res.data.category.length);
          if (res != null && res != undefined) {
            if (res.isSuccess == true) {
              let name: string;
              // console.trace(res);
              for (let j = 0; j < res.data.category.length; j++) {
                name =
                  res.data.category[j].name.charAt(0).toUpperCase() +
                  res.data.category[j].name.slice(1);
                this.categories.push({
                  id: res.data.category[j]._id,
                  name: name,
                  imageUrl: res.data.category[j].image.url,
                  thumbnail: res.data.category[j].thumbnail,
                  resizeUrl: res.data.category[j].resize_url,
                  resizeThumbnail: res.data.category[j].resize_thumbnail,
                });
              }
              this.isRendering = false;
              console.log("category is fetched");
              // this.getOffer();
            }
          }
        },
        (error) => {
          this.isLoading = false;
          if (error.error.error == undefined) {
            alert("May be your network connection is low.");
          } else {
            console.log("ERROR::::", error.error.error);
          }
        }
      );
  }

  getOffer() {
    this.http
      .get(Values.BASE_URL + "offers", {
        headers: {
          "Content-Type": "application/json",
          "x-access-token": this.token,
        },
      })
      .subscribe(
        (res: any) => {
          if (res != null && res != undefined) {
            if (res.isSuccess == true) {
              // console.log('OFFER length:::', res.data.length);
              for (let i = 0; i < res.data.length; i++) {
                const name =
                  res.data[i].name.charAt(0).toUpperCase() +
                  res.data[i].name.slice(1);
                this.dealsOfDay.push({
                  id: res.data[i].product._id,
                  name: name,
                  img: res.data[i].img,
                  weightValue: res.data[i].dimensions.value,
                  weightUnit: res.data[i].dimensions.unit,
                  price: res.data[i].price,
                  marketPrice: res.data[i].marketPrice,
                  quantity: 1,
                  isAddedToCart: false,
                });
              }
              this.getCart();
              this.getCategories();
              console.log("offer is fetched");
              // if (
              //   res.data[0].offers[0].heading == '' ||
              //   res.data[0].offers[0].heading == undefined ||
              //   res.data[0].offers[0].heading == null
              // ) {
              //   this.offerHeading = 'Save more with';
              // } else {
              //   this.offerHeading = res.data[0].offers[0].heading;
              // }
              // if (
              //   res.data[0].offers[0].description == '' ||
              //   res.data[0].offers[0].description == undefined ||
              //   res.data[0].offers[0].description == null
              // ) {
              //   this.offer = 'sabG';
              // } else {
              //   this.offer = res.data[0].offers[0].description;
              // }
              // this.getSlider();
            }
          }
        },
        (error) => {
          if (error.error.error == undefined) {
            alert("May be your network connection is low.");
          } else {
            console.log("ERROR::::", error.error.error);
          }
        }
      );
  }

  getCart() {
    this.isLoading = true;
    console.log("cart id", localstorage.getItem("cartId"));
    this.query = `_id=${localstorage.getItem("cartId")}&pageNo=${
      this.pageNo
    }&items=${this.items}`;
    this.http
      .get(Values.BASE_URL + "carts?" + this.query, {
        headers: this.headers,
      })
      .subscribe(
        (res: any) => {
          if (res != null && res != undefined) {
            if (res.isSuccess == true) {
              const cartData = res.data.products;
              // console.log('card data in getCart:: ', cartData);
              if (res.data.products.length > 0) {
                let productQuantity: number = 0;
                for (let item of res.data.products) {
                  productQuantity += parseInt(item.quantity);
                }
                this.dataForBadge.showCartBadge = true;
                this.dataForBadge.numberOnBadge = productQuantity;
                for (let i = 0; i < this.dealsOfDay.length; i++) {
                  const filteredData = cartData.filter((item) => {
                    const productName =
                      this.dealsOfDay[i].name.charAt(0).toLowerCase() +
                      this.dealsOfDay[i].name.slice(1);
                    const cartItemName =
                      item.name.charAt(0).toLowerCase() + item.name.slice(1);
                    return (
                      cartItemName == productName &&
                      item.dimensions.value == this.dealsOfDay[i].weightValue &&
                      item.dimensions.unit == this.dealsOfDay[i].weightUnit
                    );
                  });
                  if (filteredData.length > 0) {
                    // console.log('is any match ', filteredData);
                    this.dealsOfDay[i].quantity = filteredData[0].quantity;
                    this.dealsOfDay[i].isAddedToCart = true;
                    this.dealsOfDay[i].weightValue =
                      filteredData[0].dimensions.value;
                    this.dealsOfDay[i].weightUnit =
                      filteredData[0].dimensions.unit;
                    this.dealsOfDay[i].price = filteredData[0].price;
                    this.dealsOfDay[i].marketPrice =
                      filteredData[0].marketPrice;
                  }
                }
                this.isLoading = false;
              }
              console.log("cart is fetched");
            }
          }
        },
        (error) => {
          this.isLoading = false;
          console.log("ERROR::::", error.error.error);
        }
      );
  }

  getSlider() {
    console.log("working on slider");
    this.http
      .get(Values.BASE_URL + "slider", {
        headers: this.headers,
      })
      .subscribe(
        (res: any) => {
          // console.log('res from slider ', res);
          if (res != null && res != undefined) {
            if (res.isSuccess == true && res.data.length != 0) {
              // console.trace('SLIDER::::', res);
              this.sliderImage1 = res.data[0].images[0].url;
              this.sliderImage2 = res.data[0].images[1].url;
              this.sliderImage3 = res.data[0].images[2].url;
              this.sliderImage4 = res.data[0].images[3].url;
              console.log("slide is fetched");
            }
            this.getOffer();
          }
        },
        (error) => {
          console.log("ERROR::::", error.error.error);
        }
      );
  }

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
  //       nativeGridMain.setElevation(10);
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

  // onCategoryLoaded(args: any) {
  //   const categoryCard = <any>args.object;
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

  // onSliderLoaded(args: any) {
  //   const sliderImage = <any>args.object;
  //   setTimeout(() => {
  //     if (sliderImage.android) {
  //       const nativeGridMain = sliderImage.android;
  //       const shape = new android.graphics.drawable.GradientDrawable();
  //       shape.setShape(android.graphics.drawable.GradientDrawable.RECTANGLE);
  //       shape.setColor(android.graphics.Color.parseColor('white'));
  //       shape.setCornerRadius(10);
  //       nativeGridMain.setBackgroundDrawable(shape);
  //       nativeGridMain.setElevation(5);
  //     } else if (sliderImage.ios) {
  //       const nativeGridMain = sliderImage.ios;
  //       nativeGridMain.layer.shadowColor = this.shadowColor.ios.CGColor;
  //       nativeGridMain.layer.shadowOffset = CGSizeMake(0, this.shadowOffset);
  //       nativeGridMain.layer.shadowOpacity = 0.5;
  //       nativeGridMain.layer.shadowRadius = 5.0;
  //       nativeGridMain.layer.shadowRadius = 5.0;
  //     }
  //     // this.changeDetector.detectChanges();
  //   }, 10);
  // }

  onCategoryClick(index: number) {
    this.routerExtensions.navigate(["/products"], {
      queryParams: {
        categoryName: this.categories[index].name,
        categoryId: this.categories[index].id,
      },
    });
  }

  onAddToCart(index: number) {
    if (
      localstorage.getItem("cartId") != null &&
      localstorage.getItem("cartId") != undefined
    ) {
      this.cart.product.quantity = 1;
      this.cart.product.dimensions.value = this.dealsOfDay[index].weightValue;
      this.cart.product.dimensions.unit = this.dealsOfDay[index].weightUnit;
      this.cart.product.price = this.dealsOfDay[index].price;
      this.cart.product.marketPrice = this.dealsOfDay[index].marketPrice;
      setTimeout(() => {
        // console.log('cart value in add to cart btn:: ', this.cart);
        this.addingToCart(this.dealsOfDay[index], index);
      }, 10);
    }
  }

  onMinus(index: number) {
    const selectedItem = this.dealsOfDay[index];
    if (this.dealsOfDay[index].quantity == 1) {
      this.deleteItemFromCart(selectedItem, index);
    } else {
      this.cart.product.quantity = parseInt(selectedItem.quantity) - 1;
      this.cart.product.price = selectedItem.price;
      this.cart.product.marketPrice = selectedItem.marketPrice;
      this.cart.product.dimensions.value = selectedItem.weightValue;
      this.cart.product.dimensions.unit = selectedItem.weightUnit;

      setTimeout(() => {
        // console.log('CART BODY on minus::::::', this.cart);
        this.addingToCart(selectedItem, index);
      }, 50);
    }
  }

  onPlus(index: number) {
    const product = this.dealsOfDay[index];
    this.cart.product.price = product.price;
    this.cart.product.marketPrice = product.marketPrice;
    this.cart.product.dimensions.value = product.weightValue;
    this.cart.product.dimensions.unit = product.weightUnit;
    this.cart.product.quantity = parseInt(product.quantity) + 1;

    setTimeout(() => {
      // console.log('CART BODY on plus::::::', this.cart);
      this.addingToCart(product, index);
    }, 50);
  }

  onScroll(args: TextField) {
    args.dismissSoftInput();
  }

  onReturnFromTextField(args: TextField) {
    if (args.text.length != 0) {
      this.routerExtensions.navigate(["search"], {
        queryParams: {
          searchedItem: args.text,
        },
      });
      setTimeout(() => {
        args.text = "";
      }, 500);
    } else {
      args.dismissSoftInput();
    }
  }

  // onProductFetched() {
  //   const screenWidth = screen.mainScreen.widthDIPs;
  //   this.discountFontSize = (3.5 * screenWidth) / 100;
  // }

  private addingToCart(item: any, i: number) {
    // console.log('tapped item to add to cart ', item);
    this.isLoading = true;
    this.cart.product._id = item.id;

    this.http
      .put(
        Values.BASE_URL + "carts/" + localstorage.getItem("cartId"),
        this.cart,
        {
          headers: this.headers,
        }
      )
      .subscribe(
        (res: any) => {
          if (res != null && res != undefined) {
            if (res.isSuccess == true) {
              // console.log('response in add to cart: ', res);
              this.isLoading = false;
              Toast.makeText("Product is added to cart.", "short").show();
              item.isAddedToCart = true;
              this.getCart();
            }
          }
        },
        (error) => {
          this.isLoading = false;
          console.log("ERROR::::", error.error.error);
        }
      );
  }

  private deleteItemFromCart(item: any, i: number) {
    this.isLoading = true;
    this.cart.product._id = item.id;
    this.cart.product.quantity = 0;
    this.cart.product.dimensions.value = item.weightValue;
    this.cart.product.dimensions.unit = item.weightUnit;

    this.http
      .put(
        Values.BASE_URL + "carts/" + localstorage.getItem("cartId"),
        this.cart,
        {
          headers: this.headers,
        }
      )
      .subscribe(
        (res: any) => {
          if (res != null && res != undefined) {
            if (res.isSuccess == true) {
              // console.log('res after delete::: ', res);
              if (res.data.products.length > 0) {
                let productQuantity: number = 0;
                for (let item of res.data.products) {
                  productQuantity += parseInt(item.quantity);
                }
                this.dataForBadge.showCartBadge = true;
                this.dataForBadge.numberOnBadge = productQuantity;
              } else {
                this.dataForBadge.showCartBadge = false;
                this.dataForBadge.numberOnBadge = "";
              }
              Toast.makeText("Removed From Cart", "short").show();
              this.isLoading = false;
              item.isAddedToCart = false;
            }
          }
        },
        (error) => {
          this.isLoading = false;
          console.log("ERROR::::", error.error.error);
        }
      );
  }

  private async calculateWeightAndPrice(item: any, i: number) {
    // console.log('selected item: ', i, ' : ', item);
    let itemClass = "inActivePrice";
    let weightValue: number;
    let weightUnit: string;
    let itemPrice: any;
    let itemMarketPrice: any;

    if (item.unit == "g") {
      weightValue = item.value / 1000;
    } else {
      weightValue = item.value;
    }

    if (
      ((this.dealsOfDay[i].price / this.oldWeight) * weightValue)
        .toString()
        .includes(".")
    ) {
      itemPrice = (
        (this.dealsOfDay[i].price / this.oldWeight) *
        weightValue
      ).toPrecision(4);
    } else {
      itemPrice = (this.dealsOfDay[i].price / this.oldWeight) * weightValue;
    }

    if (
      ((this.dealsOfDay[i].marketPrice / this.oldWeight) * weightValue)
        .toString()
        .includes(".")
    ) {
      itemMarketPrice = (
        (this.dealsOfDay[i].marketPrice / this.oldWeight) *
        weightValue
      ).toPrecision(4);
    } else {
      itemMarketPrice =
        (this.dealsOfDay[i].marketPrice / this.oldWeight) * weightValue;
    }

    if (this.oldWeight == weightValue) {
      itemClass = "activePrice";
    }

    if (item.unit == "g") {
      weightValue *= 1000;
    }

    const data = {
      index: i,
      weightValue: weightValue,
      weightUnit: item.unit,
      itemPrice: itemPrice,
      itemMarketPrice: itemMarketPrice,
      classForItem: itemClass,
    };
    return data;
  }
}
