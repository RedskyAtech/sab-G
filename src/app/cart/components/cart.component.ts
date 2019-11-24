import { Dimensions } from './../../models/dimensions.model';
import { Product } from './../../models/product.model';
import { Cart } from './../../models/cart.model';
import { HeaderModule } from './../../shared/header/header.module';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterContentInit } from "@angular/core";
import { Color } from "tns-core-modules/color/color";
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';
import { UserService } from "~/app/services/user.service";
import { Page } from "tns-core-modules/ui/page/page";
import * as localstorage from "nativescript-localstorage";
import { Values } from '~/app/values/values';
import * as Toast from 'nativescript-toast';

declare const android: any;
declare const CGSizeMake: any;

@Component({
    selector: "ns-cart",
    moduleId: module.id,
    templateUrl: "./cart.component.html",
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, AfterContentInit {

    // isRendering: boolean;
    isLoading: boolean;
    renderingTimeout;
    cartProducts;
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
    constructor(private routerExtensions: RouterExtensions, private userService: UserService, private page: Page, private http: HttpClient) {
        this.page.actionBarHidden = true;
        // this.isRendering = true;
    }
    ngAfterContentInit(): void {
        // this.renderingTimeout = setTimeout(() => {
        //     this.isRendering = true;
        // }, 5000)
    }
    ngOnInit(): void {
        this.cartProducts = [];
        this.isLoading = false;
        this.subtotal = "";
        this.savedRs = "5.00";
        this.totalItems = "";
        this.deliveryCharges = "FREE";
        this.total = ""
        this.userService.headerLabel("Cart");
        this.userService.activeScreen("cart");
        this.query = "";
        this.pageNo = 1;
        this.items = 10;
        this.cart = new Cart();
        this.product = new Product();
        this.cart.product = new Product();
        this.isCart = false;
        this.cartMessage = "Cart is empty";
        this.dimensions = new Dimensions();
        this.cart.product.dimensions = new Dimensions();
        if (localstorage.getItem("token") != null && localstorage.getItem("token") != undefined) {
            this.token = localstorage.getItem("token");
            this.headers = new HttpHeaders({
                "Content-Type": "application/json",
                "x-access-token": this.token
            });
            this.getCart();
        }
        this.page.on('navigatedTo', (data) => {
            if (data.isBackNavigation) {
                this.userService.headerLabel("Cart");
                this.userService.activeScreen("cart");
                if (localstorage.getItem("token") != null && localstorage.getItem("token") != undefined) {
                    this.token = localstorage.getItem("token");
                    this.headers = new HttpHeaders({
                        "Content-Type": "application/json",
                        "x-access-token": this.token
                    });
                    this.cartProducts = [];
                    this.getCart();
                }
            }
        });
        // this.cartProducts.push(
        //     { image: "res://onion", name: "Onion", MRP: "31.50", price: "25", weight: "1", dimension: "kg", quantity: "1" },
        //     { image: "res://lady_finger", name: "Lady finger", MRP: "31.50", price: "25", weight: "500", dimension: "g", quantity: "1" },
        //     { image: "res://potato", name: "Potato", MRP: "31.50", price: "25", weight: "1", dimension: "kg", quantity: "1" },
        //     { image: "res://tomato", name: "Tomato", MRP: "31.50", price: "25", weight: "2", dimension: "kg", quantity: "1" },
        //     { image: "res://palak", name: "Palak", MRP: "31.50", price: "25", weight: "1", dimension: "kg", quantity: "1" },
        // );
    }

    protected get shadowColor(): Color {
        return new Color('#888888')
    }

    protected get shadowOffset(): number {
        return 2.0
    }

    onAddressLoaded(args: any) {
        var addressCard = <any>args.object;
        setTimeout(() => {
            if (addressCard.android) {
                let nativeGridMain = addressCard.android;
                var shape = new android.graphics.drawable.GradientDrawable();
                shape.setShape(android.graphics.drawable.GradientDrawable.RECTANGLE);
                shape.setColor(android.graphics.Color.parseColor('white'));
                shape.setCornerRadius(20)
                nativeGridMain.setBackgroundDrawable(shape);
                nativeGridMain.setElevation(10)
            } else if (addressCard.ios) {
                let nativeGridMain = addressCard.ios;
                nativeGridMain.layer.shadowColor = this.shadowColor.ios.CGColor;
                nativeGridMain.layer.shadowOffset = CGSizeMake(0, this.shadowOffset);
                nativeGridMain.layer.shadowOpacity = 0.5
                nativeGridMain.layer.shadowRadius = 5.0
                nativeGridMain.layer.shadowRadius = 5.0
            }
            // this.changeDetector.detectChanges();
        }, 50)

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

    onCheckout() {
        this.routerExtensions.navigate(['/addAddress']);
    }

    onDelete(item: any) {
        this.isLoading = true;
        this.cart.product._id = item.id;
        this.cart.product.quantity = 0;
        this.http
            .put(Values.BASE_URL + "carts/" + localstorage.getItem("cartId"), this.cart, {
                headers: this.headers
            })
            .subscribe((res: any) => {
                if (res != null && res != undefined) {
                    if (res.isSuccess == true) {
                        Toast.makeText("Deleted", "short").show();
                        this.isLoading = false;
                        this.cartProducts = [];
                        this.getCart();
                    }
                }
            }, error => {
                this.isLoading = false;
                console.log("ERROR::::", error.error.error);
            });
    }

    onMinus(item: any) {
        this.isLoading = true;
        this.cart.product._id = item.id;
        this.cart.product.quantity = item.quantity - 1;
        this.cart.product.dimensions.value = item.weightValue;
        this.cart.product.dimensions.unit = item.weightUnit;
        this.cart.product.price = item.price;
        this.http
            .put(Values.BASE_URL + "carts/" + localstorage.getItem("cartId"), this.cart, {
                headers: this.headers
            })
            .subscribe((res: any) => {
                if (res != null && res != undefined) {
                    if (res.isSuccess == true) {
                        this.isLoading = false;
                        this.cartProducts[item.index].quantity = res.data.products[item.index].quantity;
                        this.subtotal = res.data.grandTotal;
                        this.totalItems = res.data.products.length;
                        this.total = res.data.grandTotal;
                        // this.cartProducts = [];
                        // this.getCart();
                    }
                }
            }, error => {
                this.isLoading = false;
                console.log("ERROR::::", error.error.error);
            });
    }

    onPlus(item: any) {
        this.isLoading = true;
        this.cart.product._id = item.id;
        this.cart.product.quantity = item.quantity + 1;
        this.cart.product.dimensions.value = item.weightValue;
        this.cart.product.dimensions.unit = item.weightUnit;
        this.cart.product.price = item.price;
        console.log(this.cart);
        this.http
            .put(Values.BASE_URL + "carts/" + localstorage.getItem("cartId"), this.cart, {
                headers: this.headers
            })
            .subscribe((res: any) => {
                if (res != null && res != undefined) {
                    if (res.isSuccess == true) {
                        this.isLoading = false;
                        this.cartProducts[item.index].quantity = res.data.products[item.index].quantity;
                        this.subtotal = res.data.grandTotal;
                        this.totalItems = res.data.products.length;
                        this.total = res.data.grandTotal;
                        // this.cartProducts = [];
                        // this.getCart();
                    }
                }
            }, error => {
                this.isLoading = false;
                console.log("ERROR::::", error.error.error);
            });
    }

    getCart() {
        this.isLoading = true;
        this.query = `_id=${localstorage.getItem("cartId")}&pageNo=${this.pageNo}&items=${this.items}`
        this.http
            .get(Values.BASE_URL + "carts?" + this.query, {
                headers: this.headers
            })
            .subscribe((res: any) => {
                if (res != null && res != undefined) {
                    if (res.isSuccess == true) {
                        console.trace("CARTS:::::", res);
                        if (res.data.products.length > 0) {
                            this.isCart = true;
                            this.subtotal = res.data.grandTotal;
                            this.totalItems = res.data.products.length;
                            this.total = res.data.grandTotal;
                            for (var i = 0; i < res.data.products.length; i++) {
                                this.cartProducts.push({
                                    id: res.data.products[i]._id,
                                    name: res.data.products[i].name,
                                    imageUrl: res.data.products[i].image.url,
                                    // thumbnail: res.data.products[i].image.thumbnail,
                                    // resize_url: res.data.products[i].image.resize_url,
                                    // resize_thumbnail: res.data.products[i].image.resize_thumbnail,
                                    price: res.data.products[i].price,
                                    marketPrice: res.data.products[i].marketPrice,
                                    weightValue: res.data.products[i].dimensions.value,
                                    weightUnit: res.data.products[i].dimensions.unit,
                                    quantity: res.data.products[i].quantity,
                                    index: i
                                });
                            }
                        }
                        else {
                            this.isCart = false;
                        }
                        this.isLoading = false;
                    }
                }
            }, error => {
                this.isLoading = false;
                console.log("ERROR::::", error.error.error);
            });
    }
}