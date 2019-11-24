import { Component, OnInit, AfterContentInit } from "@angular/core";
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';
import { UserService } from "~/app/services/user.service";
import { Color } from "tns-core-modules/color/color";
import { Page } from "tns-core-modules/ui/page/page";

declare const android: any;
declare const CGSizeMake: any;

@Component({
    selector: "ns-congratulations",
    moduleId: module.id,
    templateUrl: "./congratulations.component.html",
    styleUrls: ['./congratulations.component.css']
})
export class CongratulationsComponent implements OnInit, AfterContentInit {

    // isRendering: boolean;
    isLoading: boolean;
    renderingTimeout;
    gotItButton: string;
    constructor(private routerExtensions: RouterExtensions, private userService: UserService, private page: Page) {
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
        // this.userService.headerLabel("Delivery address");
        this.userService.activeScreen("congratulations");
        this.userService.showBack("hidden");
        this.gotItButton = "Got It!";
    }

    protected get shadowColor(): Color {
        return new Color('#888888')
    }

    protected get shadowOffset(): number {
        return 2.0
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

    onGotItClick() {
        this.routerExtensions.navigate(['/menu']);
    }
}