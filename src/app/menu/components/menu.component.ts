import { Component, OnInit, AfterContentInit, ViewChild } from "@angular/core";
import { Color } from "tns-core-modules/color/color";
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';
import { UserService } from "~/app/services/user.service";
import { ModalComponent } from "~/app/modals/modal.component";

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
    constructor(private routerExtensions: RouterExtensions, private userService: UserService) {
        this.userService.activeScreen("menu");
        // this.isRendering = true;
        this.isLoading = false;
        this.userService.showFooter(false);
        this.userService.showHeader(false);
        this.userService.headerLabel("options");
        this.profilePicture = "res://man";
        this.userName = "Shinu Verma";
    }
    ngAfterContentInit(): void {
        // this.renderingTimeout = setTimeout(() => {
        //     this.isRendering = true;
        // }, 5000)
    }
    ngOnInit(): void {
        throw new Error("Method not implemented.");
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
        this.routerExtensions.navigate(['/login']);
    }

}