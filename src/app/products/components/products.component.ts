import { Cart } from './../../models/cart.model';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterContentInit, ViewChild } from "@angular/core";
import { Color } from "tns-core-modules/color/color";
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';
import { UserService } from "~/app/services/user.service";
import { ActivatedRoute } from "@angular/router";
import * as Toast from 'nativescript-toast';
import { ModalComponent } from "~/app/modals/modal.component";
import * as localstorage from "nativescript-localstorage";
import { Values } from '~/app/values/values';
import { Page } from 'tns-core-modules/ui/page/page';
import { Product } from '~/app/models/product.model';
import { Dimensions } from '~/app/models/dimensions.model';

declare const android: any;
declare const CGSizeMake: any;

@Component({
  selector: "ns-products",
  moduleId: module.id,
  templateUrl: "./products.component.html",
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, AfterContentInit {

  @ViewChild('weightDialog', { static: false }) weightDialog: ModalComponent;

  // isRendering: boolean;
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
  constructor(private routerExtensions: RouterExtensions, private userService: UserService, private route: ActivatedRoute, private http: HttpClient, private page: Page) {
    this.page.actionBarHidden = true;
    // this.isRendering = true;
  }
  ngAfterContentInit(): void {
    // this.renderingTimeout = setTimeout(() => {
    //     this.isRendering = true;
    // }, 5000)
  }
  ngOnInit(): void {
    this.products = [];
    this.weights = [];
    this.isLoading = false;
    this.addButton = "Add";
    this.categoryId = "";
    this.token = "";
    this.query = "";
    this.pageNo = 1;
    this.items = 10;
    // this.weight = "1 kg";
    this.index = 0;
    this.oldWeight = 0;
    this.cart = new Cart();
    this.product = new Product();
    this.cart.product = new Product();
    this.cart.product.dimensions = new Dimensions();
    this.isProducts = true;
    this.productMessage = "";
    this.route.queryParams.subscribe(params => {
      if (params["from"] != "") {
        this.heading = params["categoryName"];
        this.categoryId = params["categoryId"];
      }
    });
    this.userService.headerLabel(this.heading);
    this.userService.activeScreen("products");
    // this.products.push(
    //   { image: "res://onion", name: "Onion", MRP: "31.50", price: "25", weight: "500 g" },
    //   { image: "res://lady_finger", name: "Lady finger", MRP: "31.50", price: "25", weight: "1 kg" },
    //   { image: "res://potato", name: "Potato", MRP: "31.50", price: "25", weight: "1 kg" },
    //   { image: "res://tomato", name: "Tomato", MRP: "31.50", price: "25", weight: "1 kg" },
    //   { image: "res://palak", name: "Palak", MRP: "31.50", price: "25", weight: "1 kg" },
    //   { image: "res://onion", name: "Onion", MRP: "31.50", price: "25", weight: "1 kg" },
    //   { image: "res://lady_finger", name: "Lady finger", MRP: "31.50", price: "25", weight: "1 kg" },
    //   { image: "res://potato", name: "Potato", MRP: "31.50", price: "25", weight: "1 kg" },
    //   { image: "res://tomato", name: "Tomato", MRP: "31.50", price: "25", weight: "1 kg" },
    //   { image: "res://palak", name: "Palak", MRP: "31.50", price: "25", weight: "1 kg" },
    // );
    if (localstorage.getItem("token") != null && localstorage.getItem("token") != undefined) {
      this.token = localstorage.getItem("token");
      this.headers = new HttpHeaders({
        "Content-Type": "application/json",
        "x-access-token": this.token
      });
      this.getProducts();
    }
    this.page.on('navigatedTo', (data) => {
      if (data.isBackNavigation) {
        this.userService.headerLabel(this.heading);
        this.userService.activeScreen("products");
      }
    });
  }

  protected get shadowColor(): Color {
    return new Color('#888888')
  }

  protected get shadowOffset(): number {
    return 2.0
  }

  onCartLoaded(args: any) {
    var cartCard = <any>args.object;
    setTimeout(() => {
      if (cartCard.android) {
        let nativeGridMain = cartCard.android;
        var shape = new android.graphics.drawable.GradientDrawable();
        shape.setShape(android.graphics.drawable.GradientDrawable.RECTANGLE);
        shape.setColor(android.graphics.Color.parseColor('white'));
        shape.setCornerRadius(20)
        nativeGridMain.setBackgroundDrawable(shape);
        nativeGridMain.setElevation(5)
      } else if (cartCard.ios) {
        let nativeGridMain = cartCard.ios;
        nativeGridMain.layer.shadowColor = this.shadowColor.ios.CGColor;
        nativeGridMain.layer.shadowOffset = CGSizeMake(0, this.shadowOffset);
        nativeGridMain.layer.shadowOpacity = 0.5
        nativeGridMain.layer.shadowRadius = 5.0
        nativeGridMain.layer.shadowRadius = 5.0
      }
      // this.changeDetector.detectChanges();
    }, 10)
  }

  onCartImageLoaded(args: any) {
    var cartImage = <any>args.object;
    setTimeout(() => {
      if (cartImage.android) {
        let nativeGridMain = cartImage.android;
        var shape = new android.graphics.drawable.GradientDrawable();
        shape.setShape(android.graphics.drawable.GradientDrawable.RECTANGLE);
        shape.setColor(android.graphics.Color.parseColor('#F3F3F3'));
        shape.setCornerRadius(20)
        nativeGridMain.setBackgroundDrawable(shape);
        nativeGridMain.setElevation(0)
      } else if (cartImage.ios) {
        let nativeGridMain = cartImage.ios;
        nativeGridMain.layer.shadowColor = this.shadowColor.ios.CGColor;
        nativeGridMain.layer.shadowOffset = CGSizeMake(0, this.shadowOffset);
        nativeGridMain.layer.shadowOpacity = 0.5
        nativeGridMain.layer.shadowRadius = 5.0
        nativeGridMain.layer.shadowRadius = 5.0
      }
      // this.changeDetector.detectChanges();
    }, 10)
  }

  onHeaderLoaded(args: any) {
    var headerCard = <any>args.object;
    setTimeout(() => {
      if (headerCard.android) {
        let nativeGridMain = headerCard.android;
        var shape = new android.graphics.drawable.GradientDrawable();
        shape.setShape(android.graphics.drawable.GradientDrawable.RECTANGLE);
        shape.setColor(android.graphics.Color.parseColor('white'));
        shape.setCornerRadius(0)
        nativeGridMain.setBackgroundDrawable(shape);
        nativeGridMain.setElevation(5)
      } else if (headerCard.ios) {
        let nativeGridMain = headerCard.ios;
        nativeGridMain.layer.shadowColor = this.shadowColor.ios.CGColor;
        nativeGridMain.layer.shadowOffset = CGSizeMake(0, this.shadowOffset);
        nativeGridMain.layer.shadowOpacity = 0.5
        nativeGridMain.layer.shadowRadius = 5.0
        nativeGridMain.layer.shadowRadius = 5.0
      }
      // this.changeDetector.detectChanges();
    }, 50)
  }

  onFooterLoaded(args: any) {
    var footerCard = <any>args.object;
    setTimeout(() => {
      if (footerCard.android) {
        let nativeGridMain = footerCard.android;
        var shape = new android.graphics.drawable.GradientDrawable();
        shape.setShape(android.graphics.drawable.GradientDrawable.RECTANGLE);
        shape.setColor(android.graphics.Color.parseColor('white'));
        shape.setCornerRadius(0)
        nativeGridMain.setBackgroundDrawable(shape);
        nativeGridMain.setElevation(5)
      } else if (footerCard.ios) {
        let nativeGridMain = footerCard.ios;
        nativeGridMain.layer.shadowColor = this.shadowColor.ios.CGColor;
        nativeGridMain.layer.shadowOffset = CGSizeMake(0, this.shadowOffset);
        nativeGridMain.layer.shadowOpacity = 0.5
        nativeGridMain.layer.shadowRadius = 5.0
        nativeGridMain.layer.shadowRadius = 5.0
      }
      // this.changeDetector.detectChanges();
    }, 50)
  }

  getProducts() {
    // this.isLoading = true;
    // this.query = `_id=${this.categoryId}&pageNo=${this.pageNo}&items=${this.items}`
    console.log(Values.BASE_URL + `products?_id=${this.categoryId}&pageNo=${this.pageNo}&items=${this.items}&status=active`);
    this.http
      .get(Values.BASE_URL + `products?_id=${this.categoryId}&pageNo=${this.pageNo}&items=${this.items}`, {
        headers: this.headers
      })
      .subscribe((res: any) => {
        if (res != null && res != undefined) {
          if (res.isSuccess == true) {
            console.trace("PRODUCTS:::::", res);
            if (res.data.products.length > 0) {
              this.isProducts = true;
              this.productMessage = "";
              for (var i = 0; i < res.data.products.length; i++) {
                //   // console.log(res.data.)
                this.products.push({
                  id: res.data.products[i]._id,
                  name: res.data.products[i].name,
                  imageUrl: res.data.products[i].image.url,
                  thumbnail: res.data.products[i].image.thumbnail,
                  resize_url: res.data.products[i].image.resize_url,
                  resize_thumbnail: res.data.products[i].image.resize_thumbnail,
                  price: res.data.products[i].price,
                  marketPrice: res.data.products[i].marketPrice,
                  weightValue: res.data.products[i].dimensions.value,
                  weightUnit: res.data.products[i].dimensions.unit,
                  index: i
                });
              }
              this.isLoading = false;
              this.pageNo = this.pageNo + 1;
              this.getProducts();
            }
            else {
              if (this.pageNo == 1) {
                this.isProducts = false;
                this.productMessage = "There is no products."
              }
            }
            this.isLoading = false;
          }
        }
      }, error => {
        this.isLoading = false;
        console.log("ERROR::::", error.error.error);
      });
  }

  onAddToCart(item: any) {
    Toast.makeText("Product is added to cart.", "long").show();
    if (localstorage.getItem("cartId") != null && localstorage.getItem("cartId") != undefined) {
      this.isLoading = true;
      this.cart.product._id = item.id;
      this.cart.product.dimensions.value = item.weightValue;
      this.cart.product.dimensions.unit = item.weightUnit;
      this.cart.product.price = item.price;
      this.cart.product.quantity = 1;
      console.log("CART BODY::::::", this.cart);
      this.http
        .put(Values.BASE_URL + "carts/" + localstorage.getItem("cartId"), this.cart, {
          headers: this.headers
        })
        .subscribe((res: any) => {
          if (res != null && res != undefined) {
            if (res.isSuccess == true) {
              console.log(res);
              this.isLoading = false;
            }
          }
        }, error => {
          this.isLoading = false;
          console.log("ERROR::::", error.error.error);
        });
    }
  }

  onSelectWeight(item: any) {
    this.index = item.index;
    if (item.weightUnit == "g") {
      this.weights = [];
      this.weights.push(
        // { value: "100", unit: "g" },
        { value: "250", unit: "g" },
        // { value: "300", unit: "g" },
        // { value: "400", unit: "g" },
        { value: "500", unit: "g" },
        // { value: "600", unit: "g" },
        // { value: "700", unit: "g" },
        // { value: "800", unit: "g" },
        // { value: "900", unit: "g" },
        { value: "1", unit: "kg" },
        { value: "2", unit: "kg" },
        { value: "3", unit: "kg" },
        { value: "4", unit: "kg" },
        { value: "5", unit: "kg" },
        // { value: "6", unit: "kg" },
        // { value: "7", unit: "kg" },
        // { value: "8", unit: "kg" },
        // { value: "9", unit: "kg" },
        // { value: "10", unit: "kg" }
      );
      this.oldWeight = parseInt(item.weightValue) / 1000;
    }
    else {
      this.oldWeight = parseInt(item.weightValue);
      if (item.weightUnit == "kg") {
        this.weights = [];
        this.weights.push(
          // { value: "100", unit: "g" },
          { value: "250", unit: "g" },
          // { value: "300", unit: "g" },
          // { value: "400", unit: "g" },
          { value: "500", unit: "g" },
          // { value: "600", unit: "g" },
          // { value: "700", unit: "g" },
          // { value: "800", unit: "g" },
          // { value: "900", unit: "g" },
          { value: "1", unit: "kg" },
          { value: "2", unit: "kg" },
          { value: "3", unit: "kg" },
          { value: "4", unit: "kg" },
          { value: "5", unit: "kg" },
          // { value: "6", unit: "kg" },
          // { value: "7", unit: "kg" },
          // { value: "8", unit: "kg" },
          // { value: "9", unit: "kg" },
          // { value: "10", unit: "kg" }
        );
      }
      else {
        this.weights = [];
        this.weights.push(
          { value: "1", unit: "piece" },
          { value: "2", unit: "piece" },
          { value: "3", unit: "piece" },
          { value: "4", unit: "piece" },
          { value: "5", unit: "piece" },
          { value: "6", unit: "piece" },
          { value: "7", unit: "piece" },
          { value: "8", unit: "piece" },
          { value: "9", unit: "piece" },
          { value: "10", unit: "piece" },
          { value: "11", unit: "piece" },
          { value: "12", unit: "piece" }
        );
      }
    }
    this.weightDialog.show();
  }

  onWeight(item: any) {
    this.products[this.index].weightUnit = item.unit;
    this.products[this.index].weightValue = item.value;
    if (item.unit == "g") {
      var weightValue = item.value / 1000;
    }
    else {
      weightValue = item.value;
    }
    console.log(((this.products[this.index].price / this.oldWeight) * weightValue));
    console.log(((this.products[this.index].price / this.oldWeight) * weightValue).toString().includes("."));
    if (((this.products[this.index].price / this.oldWeight) * weightValue).toString().includes(".")) {
      this.products[this.index].price = ((this.products[this.index].price / this.oldWeight) * weightValue).toPrecision(4);
    }
    else {
      this.products[this.index].price = ((this.products[this.index].price / this.oldWeight) * weightValue);
    }
    if (((this.products[this.index].marketPrice / this.oldWeight) * weightValue).toString().includes(".")) {
      this.products[this.index].marketPrice = ((this.products[this.index].marketPrice / this.oldWeight) * weightValue).toPrecision(4);
    }
    else {
      this.products[this.index].marketPrice = ((this.products[this.index].marketPrice / this.oldWeight) * weightValue);
    }
    this.weightDialog.hide();
  }

  onOutsideClick() {
    this.weightDialog.hide();
  }
}
