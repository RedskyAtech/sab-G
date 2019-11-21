import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterContentInit } from "@angular/core";
import { Color } from "tns-core-modules/color/color";
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';
import { UserService } from "~/app/services/user.service";
import { Page } from "tns-core-modules/ui/page/page";
import { Values } from "~/app/values/values";
import * as localstorage from "nativescript-localstorage";

declare const android: any;
declare const CGSizeMake: any;

@Component({
    selector: "ns-home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterContentInit {

    // isRendering: boolean;
    isLoading: boolean;
    renderingTimeout;
    categories;
    offerHeading: string;
    offer: string;
    selectedPage: number;
    sliderImage1: string;
    sliderImage2: string;
    sliderImage3: string;
    sliderImage4: string;
    token: string;
    headers: HttpHeaders;

    constructor(private routerExtensions: RouterExtensions, private userService: UserService, private page: Page, private http: HttpClient) {
        this.page.actionBarHidden = true;
        // this.isRendering = true;
        this.page.on('navigatedTo', (data) => {
            if (data.isBackNavigation) {
                this.userService.activeScreen("home");
                this.userService.headerLabel("sabG");
                this.userService.showBack("hidden");
            }
        });
    }
    ngAfterContentInit(): void {
        // this.renderingTimeout = setTimeout(() => {
        //     this.isRendering = true;
        // }, 5000)
    }
    ngOnInit(): void {
        this.isLoading = false;
        this.categories = [];
        this.offerHeading = ""
        this.offer = ""
        this.selectedPage = 0;
        this.sliderImage1 = "res://slider";
        this.sliderImage2 = "res://slider2";
        this.sliderImage3 = "res://slider3";
        this.sliderImage4 = "res://slider4";
        this.token = "";

        if (localstorage.getItem("token") != null && localstorage.getItem("token") != undefined) {
            this.token = localstorage.getItem("token");
            this.headers = new HttpHeaders({
                "Content-Type": "application/json",
                "x-access-token": this.token
            });
        }

        setInterval(() => {
            setTimeout(() => {
                this.selectedPage++;
            }, 6000)
            if (this.selectedPage == 3) {
                setTimeout(() => {
                    this.selectedPage = 0;
                }, 6000);
            }
        }, 6000);
        this.userService.activeScreen("home");
        this.userService.headerLabel("sabG");
        this.userService.showBack("hidden");
        this.getCategories();
    }

    protected get shadowColor(): Color {
        return new Color('#888888')
    }

    protected get shadowOffset(): number {
        return 2.0
    }

    getCategories() {
        this.isLoading = true;
        this.http
            .get(Values.BASE_URL + "categories", {
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": this.token
                }
            })
            .subscribe((res: any) => {
                if (res != null && res != undefined) {
                    if (res.isSuccess == true) {
                        console.trace(res);
                        for (var i = 0; i < 6; i++) {
                            this.categories.push({
                                id: res.data[i]._id,
                                name: res.data[i].name,
                                imageUrl: res.data[i].image.url,
                                thumbnail: res.data[i].thumbnail,
                                resize_url: res.data[i].resize_url,
                                resize_thumbnail: res.data[i].resize_thumbnail
                            });
                        }
                        this.isLoading = false;
                        this.getOffer();
                    }
                }
            }, error => {
                this.isLoading = false;
                if (error.error.error == undefined) {
                    alert("May be your network connection is low.")
                } else {
                    console.log("ERROR::::", error.error.error);
                }
            });
    }

    getOffer() {
        this.isLoading = true;
        this.http
            .get(Values.BASE_URL + "offers", {
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": this.token
                }
            })
            .subscribe((res: any) => {
                if (res != null && res != undefined) {
                    if (res.isSuccess == true) {
                        console.log("OFFER:::", res);
                        this.isLoading = false;
                        this.offerHeading = res.data[0].offers[0].heading;
                        this.offer = res.data[0].offers[0].description;
                        this.getSlider();
                    }
                }
            }, error => {
                this.isLoading = false;
                if (error.error.error == undefined) {
                    alert("May be your network connection is low.")
                } else {
                    console.log("ERROR::::", error.error.error);
                }
            });
    }

    getSlider() {
        this.isLoading = true;
        this.http
            .get(Values.BASE_URL + "slider", {
                headers: this.headers
            })
            .subscribe((res: any) => {
                if (res != null && res != undefined) {
                    if (res.isSuccess == true) {
                        console.trace("SLIDER::::", res);
                        this.isLoading = false;
                        this.sliderImage1 = res.data[0].images[0].url;
                        this.sliderImage2 = res.data[0].images[1].url;
                        this.sliderImage3 = res.data[0].images[2].url;
                        this.sliderImage4 = res.data[0].images[3].url;
                    }
                }
            }, error => {
                this.isLoading = false;
                console.log("ERROR::::", error.error.error);
            });
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

    onCategoryLoaded(args: any) {
        var categoryCard = <any>args.object;
        setTimeout(() => {
            if (categoryCard.android) {
                let nativeGridMain = categoryCard.android;
                var shape = new android.graphics.drawable.GradientDrawable();
                shape.setShape(android.graphics.drawable.GradientDrawable.RECTANGLE);
                shape.setColor(android.graphics.Color.parseColor('white'));
                shape.setCornerRadius(20)
                nativeGridMain.setBackgroundDrawable(shape);
                nativeGridMain.setElevation(5)
            } else if (categoryCard.ios) {
                let nativeGridMain = categoryCard.ios;
                nativeGridMain.layer.shadowColor = this.shadowColor.ios.CGColor;
                nativeGridMain.layer.shadowOffset = CGSizeMake(0, this.shadowOffset);
                nativeGridMain.layer.shadowOpacity = 0.5
                nativeGridMain.layer.shadowRadius = 5.0
                nativeGridMain.layer.shadowRadius = 5.0
            }
            // this.changeDetector.detectChanges();
        }, 10)
    }

    onViewMoreClick() {
        this.routerExtensions.navigate(['/categories']);
        // alert("view more clicked");
    }

    onCategoryClick(item: any) {
        this.routerExtensions.navigate(['/products'], {
            queryParams: {
                "categoryName": item.name,
                "categoryId": item.id
            },
        });
    }
}