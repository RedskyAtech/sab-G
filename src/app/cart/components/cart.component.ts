import { Dimensions } from "./../../models/dimensions.model";
import { Product } from "./../../models/product.model";
import { Cart } from "./../../models/cart.model";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import {
  Component,
  OnInit,
  AfterContentInit,
  ChangeDetectorRef,
} from "@angular/core";
import { Color } from "@nativescript/core";
import { RouterExtensions } from "@nativescript/angular";
import { UserService } from "~/app/services/user.service";
import { Page } from "@nativescript/core";
import * as localstorage from "nativescript-localstorage";
import { Values } from "~/app/values/values";
import * as Toast from "nativescript-toast";
import { slideInAnimation } from "~/app/route-animation";
import { Screen } from '@nativescript/core';
import { images } from "~/app/assets/index";

@Component({
  selector: "ns-cart",
  moduleId: module.id,
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"],
  animations: [slideInAnimation],
})
export class CartComponent implements OnInit, AfterContentInit {
  assets = {
    rubbishIcon: images.RUBBISH_BIN_GRAY_ICON,
    minusIcon: images.MINUS_ICON,
    plusIcon: images.PLUS_ICON,
  };

  isLoading: boolean;
  renderingTimeout;
  cartProducts: any = [];
  subtotal: string;
  savedRs: string;
  totalItems: string;
  deliveryCharges: string;
  total: string;
  token: string;
  headers: HttpHeaders;
  query: string;
  pageNo: number;
  items: number;
  cart: Cart;
  product: Product;
  isCart: boolean;
  cartMessage: string;
  dimensions: Dimensions;
  oldWeight: any;
  index: number;
  nameFontSize: number = 12;
  priceFontSize: number = 12;
  itemHeight: number = 120;
  dataForBadge: any = { showCartBadge: false, numberOnBadge: "" };
  rubbishBinIcon: string = this.assets.rubbishIcon;
  minusIcon: string = this.assets.minusIcon;
  plusIcon: string = this.assets.plusIcon;

  test = ["1", "2", "3"];
  constructor(
    private routerExtensions: RouterExtensions,
    private userService: UserService,
    private page: Page,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {
    this.page.actionBarHidden = true;
  }

  ngAfterContentInit(): void { }

  ngOnInit(): void {
    console.log("ng oninit start in cart");
    const screenHeight = Screen.mainScreen.heightDIPs;
    const screenWidth = Screen.mainScreen.widthDIPs;
    this.nameFontSize = (4 * screenWidth) / 100;
    this.priceFontSize = (3.5 * screenWidth) / 100;
    this.itemHeight = (12 * screenHeight) / 100;

    this.isLoading = false;
    this.subtotal = "";
    this.savedRs = "5.00";
    this.totalItems = "";
    this.deliveryCharges = "FREE";
    this.total = "";
    this.userService.headerLabel("Cart");
    this.userService.activeScreen("cart");
    this.userService.showBack("hidden");

    this.query = "";
    this.pageNo = 1;
    this.items = 10;
    this.cart = new Cart();
    this.product = new Product();
    this.cart.product = new Product();
    this.isCart = false;
    this.cartMessage = "";
    this.dimensions = new Dimensions();
    this.cart.product.dimensions = new Dimensions();
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
      console.log("getting cart after getting token");
    }
    this.page.on("navigatedTo", (data) => {
      if (data.isBackNavigation) {
        this.userService.headerLabel("Cart");
        this.userService.activeScreen("cart");
        if (
          localstorage.getItem("token") != null &&
          localstorage.getItem("token") != undefined
        ) {
          this.token = localstorage.getItem("token");
          this.headers = new HttpHeaders({
            "Content-Type": "application/json",
            "x-access-token": this.token,
          });
          this.cartProducts = [];
          this.getCart();
        }
      }
    });
    console.log("ng oninit end in cart");
  }

  // protected get shadowColor(): Color {
  //   return new Color('#888888');
  // }

  // protected get shadowOffset(): number {
  //   return 2.0;
  // }

  // onAddressLoaded(args: any) {
  //   const addressCard:any = args.object;
  //   setTimeout(() => {
  //     if (addressCard.android) {
  //       const nativeGridMain = addressCard.android;
  //       const shape = new android.graphics.drawable.GradientDrawable();
  //       shape.setShape(android.graphics.drawable.GradientDrawable.RECTANGLE);
  //       shape.setColor(android.graphics.Color.parseColor('white'));
  //       shape.setCornerRadius(20);
  //       nativeGridMain.setBackgroundDrawable(shape);
  //       nativeGridMain.setElevation(10);
  //     } else if (addressCard.ios) {
  //       const nativeGridMain = addressCard.ios;
  //       nativeGridMain.layer.shadowColor = this.shadowColor.ios.CGColor;
  //       nativeGridMain.layer.shadowOffset = CGSizeMake(0, this.shadowOffset);
  //       nativeGridMain.layer.shadowOpacity = 0.5;
  //       nativeGridMain.layer.shadowRadius = 5.0;
  //       nativeGridMain.layer.shadowRadius = 5.0;
  //     }
  //     // this.changeDetector.detectChanges();
  //   }, 50);
  // }

  // onCartLoaded(args: any) {
  //   const cartCard:any = args.object;
  //   setTimeout(() => {
  //     if (cartCard.android) {
  //       const nativeGridMain = cartCard.android;
  //       const shape = new android.graphics.drawable.GradientDrawable();
  //       shape.setShape(android.graphics.drawable.GradientDrawable.RECTANGLE);
  //       shape.setColor(android.graphics.Color.parseColor('white'));
  //       shape.setCornerRadius(20);
  //       nativeGridMain.setBackgroundDrawable(shape);
  //       nativeGridMain.setElevation(5);
  //     } else if (cartCard.ios) {
  //       const nativeGridMain = cartCard.ios;
  //       nativeGridMain.layer.shadowColor = this.shadowColor.ios.CGColor;
  //       nativeGridMain.layer.shadowOffset = CGSizeMake(0, this.shadowOffset);
  //       nativeGridMain.layer.shadowOpacity = 0.5;
  //       nativeGridMain.layer.shadowRadius = 5.0;
  //       nativeGridMain.layer.shadowRadius = 5.0;
  //     }
  //     // this.changeDetector.detectChanges();
  //   }, 10);
  // }

  // onCartImageLoaded(args: any) {
  //   const cartImage:any = args.object;
  //   setTimeout(() => {
  //     if (cartImage.android) {
  //       const nativeGridMain = cartImage.android;
  //       const shape = new android.graphics.drawable.GradientDrawable();
  //       shape.setShape(android.graphics.drawable.GradientDrawable.RECTANGLE);
  //       shape.setColor(android.graphics.Color.parseColor('#F3F3F3'));
  //       shape.setCornerRadius(20);
  //       nativeGridMain.setBackgroundDrawable(shape);
  //       nativeGridMain.setElevation(0);
  //     } else if (cartImage.ios) {
  //       const nativeGridMain = cartImage.ios;
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

  onCheckout() {
    this.routerExtensions.navigate(["/addAddress"]);
  }

  onDelete(item: any) {
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
              // console.log('res after delete:: ', res);
              Toast.makeText("Deleted", "short").show();
              this.isLoading = false;
              this.cartProducts = [];
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

  onMinus(selectedItem: any) {
    // console.log('item for minus:: ', selectedItem);
    if (selectedItem.quantity == 1) {
      this.onDelete(selectedItem);
    } else {
      this.cart.product.quantity = parseInt(selectedItem.quantity) - 1;
      this.cart.product.price = selectedItem.price;
      this.cart.product.marketPrice = selectedItem.marketPrice;
      this.cart.product.dimensions.value = selectedItem.weightValue;
      this.cart.product.dimensions.unit = selectedItem.weightUnit;

      setTimeout(() => {
        // console.log('CART BODY on minus ::::::', this.cart);
        this.addItemToCartOnPlusMinus(selectedItem);
      }, 50);
    }
  }

  onPlus(product: any) {
    if (product.quantity <= 10) {
      this.cart.product.price = product.price;
      this.cart.product.marketPrice = product.marketPrice;
      this.cart.product.dimensions.value = product.weightValue;
      this.cart.product.dimensions.unit = product.weightUnit;
      this.cart.product.quantity = parseInt(product.quantity) + 1;

      setTimeout(() => {
        // console.log('CART BODY on plus::::::', this.cart);
        this.addItemToCartOnPlusMinus(product);
      }, 50);
    }
  }

  getCart() {
    this.isLoading = true;
    console.log(localstorage.getItem("cartId"));
    this.query = `_id=${localstorage.getItem("cartId")}&pageNo=${this.pageNo
      }&items=${this.items}`;
    this.http
      .get(Values.BASE_URL + "carts?" + this.query, {
        headers: this.headers,
      })
      .subscribe(
        (res: any) => {
          if (res != null && res != undefined) {
            if (res.isSuccess == true) {
              // console.trace('CARTS:::::', res);
              if (res.data.products.length > 0) {
                let productQuantity: number = 0;
                for (let item of res.data.products) {
                  productQuantity += parseInt(item.quantity);
                }
                this.dataForBadge.showCartBadge = true;
                this.dataForBadge.numberOnBadge = productQuantity;
                this.cartProducts = [];
                this.cartMessage = "";
                this.subtotal = res.data.grandTotal;
                this.totalItems = res.data.products.length;
                this.total = res.data.grandTotal;
                if (res.data.deliveryCharge > 0) {
                  this.deliveryCharges = res.data.deliveryCharge;
                }
                this.subtotal = (
                  res.data.grandTotal - res.data.deliveryCharge
                ).toString();

                for (let i = 0; i < res.data.products.length; i++) {
                  let unitWeightPrice: number;
                  if (res.data.products[i].dimensions.value == 250) {
                    unitWeightPrice = res.data.products[i].price * 4;
                  } else if (res.data.products[i].dimensions.value == 500) {
                    unitWeightPrice = res.data.products[i].price * 2;
                  } else {
                    unitWeightPrice =
                      res.data.products[i].price /
                      res.data.products[i].dimensions.value;
                  }
                  //  \res.data.products[i].price / ;
                  const name =
                    res.data.products[i].name.charAt(0).toUpperCase() +
                    res.data.products[i].name.slice(1);
                  this.cartProducts.push({
                    id: res.data.products[i]._id,
                    name: name,
                    imageUrl: res.data.products[i].image.url,
                    price: res.data.products[i].price,
                    marketPrice: res.data.products[i].marketPrice,
                    weightValue: res.data.products[i].dimensions.value,
                    weightUnit: res.data.products[i].dimensions.unit,
                    quantity: res.data.products[i].quantity,
                    baseWeightValue: res.data.products[i].dimensions.value,
                    unitWeightPrice: unitWeightPrice,
                    index: i,
                  });
                  this.isCart = true;
                }
                // console.log('cartProducts from res::::', this.cartProducts);
              } else {
                this.isCart = false;
                this.cartMessage = "Cart is empty.";
              }
              this.isLoading = false;
            }
          }
        },
        (error) => {
          this.isLoading = false;
          console.log("ERROR::::", error.error.error);
        }
      );
  }

  // onProductFetched() {
  //   const screenHeight = screen.mainScreen.heightDIPs;
  //   const screenWidth = screen.mainScreen.widthDIPs;
  //   setTimeout(() => {
  //     this.nameFontSize = (4 * screenWidth) / 100;
  //     this.priceFontSize = (3.5 * screenWidth) / 100;
  //     this.itemHeight = (12 * screenHeight) / 100;
  //   }, 100);
  // }

  private addItemToCartOnPlusMinus(item: any) {
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
              // console.log('response on add:: ', res);
              this.isLoading = false;
              this.cartProducts[item.index].quantity =
                res.data.products[item.index].quantity;
              this.subtotal = (
                res.data.grandTotal - res.data.deliveryCharge
              ).toString();
              this.totalItems = res.data.products.length;
              this.total = res.data.grandTotal;
              if (res.data.deliveryCharge == 0) {
                this.deliveryCharges = "FREE";
              } else {
                this.deliveryCharges = res.data.deliveryCharge;
              }
              this.cartProducts[item.index].quantity =
                res.data.products[item.index].quantity;
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
      ((this.cartProducts[i].price / this.oldWeight) * weightValue)
        .toString()
        .includes(".")
    ) {
      itemPrice = (
        (this.cartProducts[i].price / this.oldWeight) *
        weightValue
      ).toPrecision(4);
    } else {
      itemPrice = (this.cartProducts[i].price / this.oldWeight) * weightValue;
    }

    if (
      ((this.cartProducts[i].marketPrice / this.oldWeight) * weightValue)
        .toString()
        .includes(".")
    ) {
      itemMarketPrice = (
        (this.cartProducts[i].marketPrice / this.oldWeight) *
        weightValue
      ).toPrecision(4);
    } else {
      itemMarketPrice =
        (this.cartProducts[i].marketPrice / this.oldWeight) * weightValue;
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
