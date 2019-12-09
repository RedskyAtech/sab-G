import { Component, OnInit, AfterContentInit, ViewChild } from "@angular/core";
import { Color } from "tns-core-modules/color/color";
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';
import { UserService } from "~/app/services/user.service";
import { ModalComponent } from "~/app/modals/modal.component";
import * as localstorage from "nativescript-localstorage";
import { Page } from "tns-core-modules/ui/page/page";
import { Values } from "~/app/values/values";
import { HttpClient, HttpHeaders } from "@angular/common/http";

declare const android: any;
declare const CGSizeMake: any;

@Component({
    selector: "ns-menu",
    moduleId: module.id,
    templateUrl: "./menu.component.html",
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit, AfterContentInit {
    @ViewChild('viewLogoutDialog') viewLogoutDialog: ModalComponent;

    // isRendering: boolean;
    isLoading: boolean;
    renderingTimeout;
    profilePicture: string;
    userName: string;
    token: string;
    headers: HttpHeaders;
    userId: string;
    constructor(private routerExtensions: RouterExtensions, private userService: UserService, private page: Page, private http: HttpClient) {
        this.page.actionBarHidden = true;
        // this.isRendering = true;
        // this.isLoading = false;
    }
    ngAfterContentInit(): void {
        // this.renderingTimeout = setTimeout(() => {
        //     this.isRendering = true;
        // }, 5000)
    }
    ngOnInit(): void {
        this.userService.activeScreen("menu");
        this.profilePicture = "res://man";
        this.userName = "";
        this.token = "";
        this.userId = "";
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
                this.userService.activeScreen("menu");
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
                nativeGridMain.setElevation(10)
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

    onLogoutDialogLoaded(args) {
        var logoutDialog = <any>args.object;
        setTimeout(() => {
            if (logoutDialog.android) {
                let nativeImageView = logoutDialog.android;
                var shape = new android.graphics.drawable.GradientDrawable();
                shape.setShape(android.graphics.drawable.GradientDrawable.OVAL);
                shape.setColor(android.graphics.Color.parseColor('#6D7CF1'));
                nativeImageView.setElevation(20)
            } else if (logoutDialog.ios) {
                let nativeImageView = logoutDialog.ios;
                nativeImageView.layer.shadowColor = this.shadowColor.ios.CGColor;
                nativeImageView.layer.shadowOffset = CGSizeMake(0, this.shadowOffset);
                nativeImageView.layer.shadowOpacity = 0.5
                nativeImageView.layer.shadowRadius = 5.0
            }
        }, 400)
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
                        this.isLoading = false;
                        if (res.data.profile.firstName != undefined) {
                            console.log("dshdskjhdkjh dshkdjh dshkfdkj");
                            this.userName = res.data.profile.firstName;
                            if (res.data.profile.lastName != undefined) {
                                this.userName = this.userName + " " + res.data.profile.lastName;
                            }
                        }
                        this.profilePicture = res.data.profile.image.url;
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

    onNextClick() {
        this.routerExtensions.navigate(['/home']);
    }

    onHomeClick() {
        this.routerExtensions.navigate(['/home']);
    }

    onMyOrdersClick() {
        this.routerExtensions.navigate(['/myOrders']);
    }

    onFAQClick() {
        alert("FAQ clicked!!!");
    }

    onProfileClick() {
        this.routerExtensions.navigate(['/profile']);
    }

    onOutsideClick() {
        this.viewLogoutDialog.hide();
    }

    onLogout() {
        this.viewLogoutDialog.show();
    }

    onCancelLogoutDialog() {
        this.viewLogoutDialog.hide();
    }

    onLogoutDialog() {
        this.viewLogoutDialog.hide();
        localstorage.removeItem("token");
        localstorage.removeItem("userId");
        this.routerExtensions.navigate(['/login']);
    }

}