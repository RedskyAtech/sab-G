import { Cart } from "../../models/cart.model";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Component, OnInit, AfterContentInit, ViewChild } from "@angular/core";
import { Color } from "tns-core-modules/color/color";
import { RouterExtensions } from "@nativescript/angular";
import { UserService } from "~/app/services/user.service";
import { ActivatedRoute } from "@angular/router";
import * as Toast from "nativescript-toast";
import { ModalComponent } from "~/app/modals/modal.component";
import * as localstorage from "nativescript-localstorage";
import { Values } from "~/app/values/values";
import { Page, View } from "tns-core-modules/ui/page/page";
import { Product } from "~/app/models/product.model";
import { Dimensions } from "~/app/models/dimensions.model";
import { TextField } from '@nativescript/core';
import { slideInAnimation } from "~/app/route-animation";
import { StackLayout } from '@nativescript/core';
import { Screen } from '@nativescript/core';
import { Animation } from '@nativescript/core';
import { images } from "~/app/assets/index";

declare const android: any;
declare const CGSizeMake: any;

@Component({
  selector: "ns-products",
  moduleId: module.id,
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
  animations: [slideInAnimation],
})
export class SearchComponent implements OnInit, AfterContentInit {
  assets = {
    searchIcon: images.SEARCH_ICON,
    downArrowIcon: images.DOWM_ARROW_ICON,
    greenStarIcon: images.GREEN_STAR_ICON,
    closeIcon: images.CLOSE_ICON,
  };

  isRendered: boolean = false;
  isLoading: boolean;
  renderingTimeout;
  products;
  weights;
  heading: string;
  addButton: string;
  categoryId: string;
  token: string;
  headers: HttpHeaders;
  query: string;
  pageNo: number;
  items: number;
  oldWeight: number;
  index: number;
  cart: Cart;
  product: Product;
  dimensions: Dimensions;
  isProducts: boolean;
  productMessage: string;
  productName: string;
  searchHint: string;
  searchBorderColor: string;
  searchBorderWidth: string;
  searchButton: string;

  showBottomSheet: boolean = false;
  scrollViewHeight: any = 1000;
  selectedProductPic: string;
  selectedProductName: string;
  priceList: any;
  bottomSheetPosition: number;
  itemHeight: any = "30%";
  nameFontSize: number;
  priceFontSize: number;
  dataForBadge: any = { showCartBadge: false, numberOnBadge: "" };

  searchIcon: string = this.assets.searchIcon;
  downArrowIcon: string = this.assets.downArrowIcon;
  greenStarIcon: string = this.assets.greenStarIcon;
  closeIcon: string = this.assets.closeIcon;

  constructor(
    private routerExtensions: RouterExtensions,
    private userService: UserService,
    private route: ActivatedRoute,
    private http: HttpClient,
    private page: Page
  ) {
    this.page.actionBarHidden = true;
  }
  ngAfterContentInit(): void {
    setTimeout(() => {
      this.isRendered = true;
    }, 3000);
  }
  ngOnInit(): void {
    const screenHeight = Screen.mainScreen.heightDIPs;
    const screenWidth = Screen.mainScreen.widthDIPs;
    this.nameFontSize = (4 * screenWidth) / 100;
    this.priceFontSize = (3.5 * screenWidth) / 100;
    this.itemHeight = (13 * screenHeight) / 100;

    this.products = [];
    this.weights = [];
    this.isLoading = false;
    this.addButton = "Add";
    this.categoryId = "";
    this.token = "";
    this.query = "";
    this.pageNo = 1;
    this.items = 10;
    this.index = 0;
    this.oldWeight = 0;
    this.cart = new Cart();
    this.product = new Product();
    this.cart.product = new Product();
    this.cart.product.dimensions = new Dimensions();
    this.isProducts = true;
    this.productMessage = "";
    this.productName = "";
    this.searchHint = "Search products here";
    this.searchBorderColor = "#707070";
    this.searchBorderWidth = "1";
    this.searchButton = "Search";
    this.route.queryParams.subscribe((params) => {
      if (params["from"] != "") {
        this.heading = params["categoryName"];
        this.categoryId = params["categoryId"];
        this.productName = params["searchedItem"];
      }
    });
    this.weights.push(
      { value: "250", unit: "g" },
      { value: "500", unit: "g" },
      { value: "1", unit: "Kg" },
      { value: "2", unit: "Kg" },
      { value: "3", unit: "Kg" }
    );
    this.userService.headerLabel(this.heading);
    this.userService.activeScreen("search");
    this.userService.headerLabel("Search");
    if (
      localstorage.getItem("token") != null &&
      localstorage.getItem("token") != undefined
    ) {
      this.token = localstorage.getItem("token");
      this.headers = new HttpHeaders({
        "Content-Type": "application/json",
        "x-access-token": this.token,
      });
      // this.getProducts();
    }
    this.page.on("navigatedTo", (data) => {
      if (data.isBackNavigation) {
        this.userService.headerLabel(this.heading);
        this.userService.activeScreen("search");
        this.userService.headerLabel("Search");
      }
    });
  }

  updatingTextFiled(args: TextField) {
    args.text = this.productName;
    this.getProducts();
  }

  public searchTextField(args: any) {
    const textField: TextField = args.object;
    this.productName = textField.text;
    this.searchBorderColor = "#23A6DB";
    this.searchBorderWidth = "2";
    if (this.productName == "") {
      this.products = [];
    }
  }

  // protected get shadowColor(): Color {
  //   return new Color('#888888');
  // }

  // protected get shadowOffset(): number {
  //   return 2.0;
  // }

  // onCartLoaded(args: any) {
  //   const cartCard = <any>args.object;
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
  //   const cartImage = <any>args.object;
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

  onSearch(args: TextField) {
    this.getProducts();
    args.dismissSoftInput();
  }

  getCart() {
    this.isLoading = true;
    console.log(localstorage.getItem("cartId"));
    this.query = `_id=${localstorage.getItem("cartId")}&pageNo=${
      this.pageNo
    }&items=${this.items}`;
    this.http
      .get(Values.BASE_URL + "carts?" + this.query, {
        headers: this.headers,
      })
      .subscribe(
        async (res: any) => {
          if (res != null && res != undefined) {
            if (res.isSuccess == true) {
              const cartData = res.data.products;
              // console.log("response from cart ", cartData);
              if (res.data.products.length > 0) {
                let productQuantity: number = 0;
                for (let item of res.data.products) {
                  productQuantity += parseInt(item.quantity);
                }
                this.dataForBadge.showCartBadge = true;
                this.dataForBadge.numberOnBadge = productQuantity;
                for (let i = 0; i < this.products.length; i++) {
                  const filteredData = await cartData.filter((item) => {
                    const productName =
                      this.products[i].name.charAt(0).toLowerCase() +
                      this.products[i].name.slice(1);
                    const cartItemName =
                      item.name.charAt(0).toLowerCase() + item.name.slice(1);
                    // console.log(cartItemName);
                    // console.log(productName);
                    return (
                      cartItemName == productName &&
                      item.dimensions.value == this.products[i].weightValue &&
                      item.dimensions.unit == this.products[i].weightUnit
                    );
                  });
                  if (filteredData.length > 0) {
                    // console.log('is any match ', filteredData);
                    this.products[i].quantity = filteredData[0].quantity;
                    this.products[i].isAddedToCart = true;
                    this.products[i].weightValue =
                      filteredData[0].dimensions.value;
                    this.products[i].weightUnit =
                      filteredData[0].dimensions.unit;
                    this.products[i].price = filteredData[0].price;
                    this.products[i].marketPrice = filteredData[0].marketPrice;
                  }
                }
                this.isLoading = false;
              }
            }
          }
        },
        (error) => {
          this.isLoading = false;
          console.log("ERROR::::", error.error.error);
        }
      );
  }

  getProducts() {
    this.http
      .get(
        Values.BASE_URL +
          `products/search?pageNo=${this.pageNo}&items=${this.items}&name=${this.productName}`,
        {
          headers: this.headers,
        }
      )
      .subscribe(
        (res: any) => {
          if (res != null && res != undefined) {
            if (res.isSuccess == true) {
              // console.trace('PRODUCTS:::::', res);
              this.products = [];
              if (res.data.length > 0) {
                this.isProducts = true;
                this.productMessage = "";
                for (let i = 0; i < res.data.length; i++) {
                  const name =
                    res.data[i].name.charAt(0).toUpperCase() +
                    res.data[i].name.slice(1);
                  this.products.push({
                    index: i,
                    id: res.data[i]._id,
                    name: name,
                    imageUrl: res.data[i].image.url,
                    price: res.data[i].price,
                    marketPrice: res.data[i].marketPrice,
                    weightValue: res.data[i].dimensions.value,
                    weightUnit: res.data[i].dimensions.unit,
                    isAddedToCart: false,
                    quantity: 1,
                  });
                }
                setTimeout(() => {
                  this.getCart();
                }, 1000);
              } else {
                this.isProducts = false;
                this.productMessage = "There is no products.";
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

  onAddToCart(item: any) {
    // console.log('item when adding to cart ', item);
    const index = item.index;
    this.products[index].isAddedToCart = true;
    if (
      localstorage.getItem("cartId") != null &&
      localstorage.getItem("cartId") != undefined
    ) {
      this.isLoading = true;
      this.cart.product._id = item.id;
      this.cart.product.dimensions.value = item.weightValue;
      this.cart.product.dimensions.unit = item.weightUnit;
      this.cart.product.price = item.price;
      this.cart.product.marketPrice = item.marketPrice;
      this.cart.product.quantity = 1;
      // console.log('CART BODY::::::', this.cart);
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
                }
                // console.log('res in add to cart:::::: ', res.data);
                this.isLoading = false;
                Toast.makeText("Product is added to cart.", "long").show();
              }
            }
          },
          (error) => {
            this.isLoading = false;
            console.log("ERROR::::", error.error.error);
          }
        );
    }
  }

  onSelectWeight(item: any) {
    const name = item.name.charAt(0).toUpperCase() + item.name.slice(1);
    this.priceList = [];
    this.index = item.index;
    this.selectedProductPic = item.imageUrl;
    this.selectedProductName = name;

    if (item.weightUnit == "g") {
      this.oldWeight = parseInt(item.weightValue) / 1000;
    } else {
      this.oldWeight = parseInt(item.weightValue);
    }

    for (let i = 0; i < this.weights.length; i++) {
      this.calculateWeightAndPrice(this.weights[i], this.index).then(
        (data: any) => {
          this.priceList.push(data);
        }
      );
    }

    setTimeout(() => {
      this.showBottomSheet = true;
    }, 100);
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
      ((this.products[i].price / this.oldWeight) * weightValue)
        .toString()
        .includes(".")
    ) {
      itemPrice = (
        (this.products[i].price / this.oldWeight) *
        weightValue
      ).toPrecision(4);
    } else {
      itemPrice = (this.products[i].price / this.oldWeight) * weightValue;
    }

    if (
      ((this.products[i].marketPrice / this.oldWeight) * weightValue)
        .toString()
        .includes(".")
    ) {
      itemMarketPrice = (
        (this.products[i].marketPrice / this.oldWeight) *
        weightValue
      ).toPrecision(4);
    } else {
      itemMarketPrice =
        (this.products[i].marketPrice / this.oldWeight) * weightValue;
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

  onBottomSheetLoaded(args: StackLayout) {
    setTimeout(() => {
      const screenHeight = Screen.mainScreen.heightDIPs;
      this.bottomSheetPosition = screenHeight;
      const bottomSheetHeight = args.getActualSize().height;
      const inAnimation = new Animation([
        {
          target: args,
          translate: { x: 0, y: -(bottomSheetHeight + 60) },
          duration: 800,
          opacity: 1,
        },
      ]);
      inAnimation.play();
    }, 10);
  }

  onWeightLayoutOutsideTap(args: StackLayout) {
    this.onCloseIconTap(args);
  }

  onCloseIconTap(args: StackLayout) {
    const bottomSheetHeight = args.getActualSize().height;
    const inAnimation = new Animation([
      {
        target: args,
        translate: { x: 0, y: bottomSheetHeight },
        duration: 500,
      },
    ]);
    inAnimation.play().then(() => (this.showBottomSheet = false));
  }

  onBottomSheetTap() {} //noting to do with it. //It prevent calling onWeightLayoutOutsideTap() function

  onPriceTap(index: number, args: StackLayout) {
    const selectedItem = this.priceList[index];
    if (
      this.products[selectedItem.index].weightValue !=
      this.priceList[index].weightValue
    ) {
      this.products[selectedItem.index].isAddedToCart = false;
    }
    this.products[selectedItem.index].price = this.priceList[index].itemPrice;
    this.products[selectedItem.index].marketPrice =
      this.priceList[index].itemMarketPrice;
    this.products[selectedItem.index].weightValue =
      this.priceList[index].weightValue;
    this.products[selectedItem.index].weightUnit =
      this.priceList[index].weightUnit;
    this.products[selectedItem.index].quantity = 1;

    this.onCloseIconTap(args);
    setTimeout(() => {
      this.getCart();
    }, 10);
  }

  // onProductFetched() {
  //   const screenHeight = screen.mainScreen.heightDIPs;
  //   const screenWidth = screen.mainScreen.widthDIPs;
  //   this.nameFontSize = (4 * screenWidth) / 100;
  //   this.priceFontSize = (3.5 * screenWidth) / 100;
  //   this.itemHeight = (13 * screenHeight) / 100;
  // }

  onMinus(selectedItem: any) {
    if (selectedItem.quantity == 1) {
      this.deleteItemFromCart(selectedItem);
      selectedItem.isAddedToCart = false;
    } else {
      this.cart.product.price = selectedItem.price;
      this.cart.product.marketPrice = selectedItem.marketPrice;
      this.cart.product.dimensions.value = selectedItem.weightValue;
      this.cart.product.dimensions.unit = selectedItem.weightUnit;
      this.cart.product.quantity = parseInt(selectedItem.quantity) - 1;
      setTimeout(() => {
        // console.log('CART BODY on minus ::::::', this.cart);
        this.onPlusMinusAddingToCart(selectedItem, selectedItem.index);
      }, 50);
    }
  }

  onPlus(product: any) {
    this.cart.product.price = product.price;
    this.cart.product.marketPrice = product.marketPrice;
    this.cart.product.dimensions.value = product.weightValue;
    this.cart.product.dimensions.unit = product.weightUnit;
    this.cart.product.quantity = parseInt(product.quantity) + 1;

    setTimeout(() => {
      // console.log('CART BODY on plus::::::', this.cart);
      this.onPlusMinusAddingToCart(product, product.index);
    }, 50);
  }

  private onPlusMinusAddingToCart(item: any, i: number) {
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
              const cartData = res.data.products;
              if (cartData.length > 0) {
                let productQuantity: number = 0;
                for (let item of cartData) {
                  productQuantity += parseInt(item.quantity);
                }
                this.dataForBadge.showCartBadge = true;
                this.dataForBadge.numberOnBadge = productQuantity;
              } else {
                this.dataForBadge.showCartBadge = false;
                this.dataForBadge.numberOnBadge = "";
              }
              // console.log('response in add to cart + or -: ', cartData);
              this.isLoading = false;
              Toast.makeText("Product is added to cart.", "short").show();

              for (let i = 0; i < this.products.length; i++) {
                const filteredData = cartData.filter((item) => {
                  const productName =
                    this.products[i].name.charAt(0).toLowerCase() +
                    this.products[i].name.slice(1);
                  const cartItemName =
                    item.name.charAt(0).toLowerCase() + item.name.slice(1);
                  return (
                    cartItemName == productName &&
                    item.dimensions.value == this.products[i].weightValue &&
                    item.dimensions.unit == this.products[i].weightUnit
                  );
                });

                if (filteredData.length > 0) {
                  // console.log('is any match ', filteredData);
                  this.products[i].quantity = filteredData[0].quantity;
                  this.products[i].isAddedToCart = true;
                  this.products[i].weightValue =
                    filteredData[0].dimensions.value;
                  this.products[i].weightUnit = filteredData[0].dimensions.unit;
                  this.products[i].price = filteredData[0].price;
                  this.products[i].marketPrice = filteredData[0].marketPrice;
                }
              }
            }
          }
        },
        (error) => {
          this.isLoading = false;
          console.log("ERROR::::", error.error.error);
        }
      );
  }

  private deleteItemFromCart(item: any) {
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
}
