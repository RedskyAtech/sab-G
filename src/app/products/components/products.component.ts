import { Component, OnInit, AfterContentInit, ViewChild } from "@angular/core";
import { Color } from "tns-core-modules/color/color";
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';
import { UserService } from "~/app/services/user.service";
import { ActivatedRoute } from "@angular/router";
import * as Toast from 'nativescript-toast';
import { ModalComponent } from "~/app/modals/modal.component";

declare const android: any;
declare const CGSizeMake: any;

@Component({
  selector: "ns-products",
  moduleId: module.id,
  templateUrl: "./products.component.html",
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, AfterContentInit {

  @ViewChild('weightDialog') weightDialog: ModalComponent;

  // isRendering: boolean;
  isLoading: boolean;
  renderingTimeout;
  products;
  weights;
  heading: string;
  addButton: string;

  constructor(private routerExtensions: RouterExtensions, private userService: UserService, private route: ActivatedRoute) {
    // this.isRendering = true;
    this.weightDialog.show();
    this.route.queryParams.subscribe(params => {
      if (params["from"] != "") {
        this.heading = params["categoryName"];
      }
    });
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
    this.userService.showFooter(true);
    this.userService.showHeader(true);
    this.userService.headerLabel(this.heading);
    this.weights.push(
      { value: "100 g" },
      { value: "200 g" },
      { value: "300 g" },
      { value: "400 g" },
      { value: "500 g" },
      { value: "600 g" },
      { value: "700 g" },
      { value: "800 g" },
      { value: "900 g" },
      { value: "1 kg" },
      { value: "2 kg" },
      { value: "3 kg" },
      { value: "4 kg" },
      { value: "5 kg" }
    );
    this.products.push(
      { image: "res://onion", name: "Onion", MRP: "31.50", price: "25", weight: "500 g" },
      { image: "res://lady_finger", name: "Lady finger", MRP: "31.50", price: "25", weight: "1 kg" },
      { image: "res://potato", name: "Potato", MRP: "31.50", price: "25", weight: "1 kg" },
      { image: "res://tomato", name: "Tomato", MRP: "31.50", price: "25", weight: "1 kg" },
      { image: "res://palak", name: "Palak", MRP: "31.50", price: "25", weight: "1 kg" },
      { image: "res://onion", name: "Onion", MRP: "31.50", price: "25", weight: "1 kg" },
      { image: "res://lady_finger", name: "Lady finger", MRP: "31.50", price: "25", weight: "1 kg" },
      { image: "res://potato", name: "Potato", MRP: "31.50", price: "25", weight: "1 kg" },
      { image: "res://tomato", name: "Tomato", MRP: "31.50", price: "25", weight: "1 kg" },
      { image: "res://palak", name: "Palak", MRP: "31.50", price: "25", weight: "1 kg" },
    );
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

  onAddToCart() {
    Toast.makeText("Product is added to cart.", "long").show();
  }

  onOutsideClick() {
    this.weightDialog.hide();
  }
}
