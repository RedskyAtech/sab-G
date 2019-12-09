import { Component, OnInit, AfterContentInit } from "@angular/core";
import { Color } from "tns-core-modules/color/color";
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';
import { UserService } from "~/app/services/user.service";
import { Page } from "tns-core-modules/ui/page/page";
import { HttpInterceptingHandler } from "@angular/common/http/src/module";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import * as localstorage from "nativescript-localstorage";
import { Values } from "~/app/values/values";

declare const android: any;
declare const CGSizeMake: any;

@Component({
    selector: "ns-profile",
    moduleId: module.id,
    templateUrl: "./profile.component.html",
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, AfterContentInit {

    // isRendering: boolean;
    isLoading: boolean;
    renderingTimeout;
    profilePicture: string;
    userName: string;
    phone: string;
    editButton: string;
    token: string;
    headers: HttpHeaders;
    userId: string;
    imageUrl: string;
    thumbnail: string;
    resize_url: string;
    resize_thumbnail: string;
    firstName: string;
    lastName: string;
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
        this.isLoading = false;
        this.userService.activeScreen("profile");
        this.userService.headerLabel("My profile");
        this.profilePicture = "res://man";
        this.userName = "";
        this.firstName = "";
        this.lastName = "";
        this.phone = "";
        this.editButton = "Edit";
        this.token = "";
        this.userId = "";
        this.imageUrl = "";
        this.thumbnail = "";
        this.resize_url = "";
        this.resize_thumbnail = "";
        if (localstorage.getItem("token") != null && localstorage.getItem("token") != undefined) {
            this.token = localstorage.getItem("token");
            this.headers = new HttpHeaders({
                "Content-Type": "application/json",
                "x-access-token": this.token
            });
            if (localstorage.getItem("userId") != null && localstorage.getItem("userId") != undefined) {
                this.userId = localstorage.getItem("userId")
            }
        }
        this.getProfile();
        this.page.on('navigatedTo', (data) => {
            if (data.isBackNavigation) {
                this.userService.headerLabel("My profile");
                this.userService.activeScreen("profile");
                if (localstorage.getItem("token") != null && localstorage.getItem("token") != undefined) {
                    this.token = localstorage.getItem("token");
                    this.headers = new HttpHeaders({
                        "Content-Type": "application/json",
                        "x-access-token": this.token
                    });
                    if (localstorage.getItem("userId") != null && localstorage.getItem("userId") != undefined) {
                        this.userId = localstorage.getItem("userId")
                    }
                }
                this.getProfile();
            }
        });
    }

    protected get shadowColor(): Color {
        return new Color('#888888')
    }

    protected get shadowOffset(): number {
        return 2.0
    }

    onOptionsLoaded(args: any) {
        var optionsCard = <any>args.object;
        setTimeout(() => {
            if (optionsCard.android) {
                let nativeGridMain = optionsCard.android;
                var shape = new android.graphics.drawable.GradientDrawable();
                shape.setShape(android.graphics.drawable.GradientDrawable.RECTANGLE);
                shape.setColor(android.graphics.Color.parseColor('white'));
                shape.setCornerRadius(20)
                nativeGridMain.setBackgroundDrawable(shape);
                nativeGridMain.setElevation(5)
            } else if (optionsCard.ios) {
                let nativeGridMain = optionsCard.ios;
                nativeGridMain.layer.shadowColor = this.shadowColor.ios.CGColor;
                nativeGridMain.layer.shadowOffset = CGSizeMake(0, this.shadowOffset);
                nativeGridMain.layer.shadowOpacity = 0.5
                nativeGridMain.layer.shadowRadius = 5.0
                nativeGridMain.layer.shadowRadius = 5.0
            }
            // this.changeDetector.detectChanges();
        }, 50)

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

    getProfile() {
        this.isLoading = true;
        this.http
            .get(Values.BASE_URL + "users/" + this.userId, {
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": this.token
                }
            })
            .subscribe((res: any) => {
                if (res != null && res != undefined) {
                    if (res.isSuccess == true) {
                        console.trace("PROFILE:::", res);
                        this.phone = res.data.phone;
                        this.isLoading = false;
                        if (res.data.profile.firstName != undefined) {
                            this.userName = res.data.profile.firstName;
                            if (res.data.profile.lastName != undefined) {
                                this.userName = this.userName + " " + res.data.profile.lastName;
                            }
                        }
                        this.firstName = res.data.profile.firstName;
                        this.lastName = res.data.profile.lastName;
                        this.profilePicture = res.data.profile.image.url;
                        this.imageUrl = res.data.profile.image.url;
                        this.thumbnail = res.data.profile.image.thumbnail;
                        this.resize_url = res.data.profile.image.resize_url;
                        this.resize_thumbnail = res.data.profile.image.resize_thumbnail;
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

    onEditClick() {
        this.routerExtensions.navigate(['/editProfile'], {
            queryParams: {
                "imageUrl": this.imageUrl,
                "thumbnail": this.thumbnail,
                "resize_url": this.resize_url,
                "resize_thumbnail": this.resize_thumbnail,
                "firstName": this.firstName,
                "lastName": this.lastName,
                "phone": this.phone,
            },
        });
    }

    onChangePasswordClick() {
        this.routerExtensions.navigate(['/changePassword']);
    }

    onShippingClick() {
        this.routerExtensions.navigate(['/shipping']);
    }
}