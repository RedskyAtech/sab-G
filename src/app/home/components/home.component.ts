import { Component, OnInit, AfterContentInit } from "@angular/core";
import { Color } from "tns-core-modules/color/color";
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';
import { UserService } from "~/app/services/user.service";

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
    constructor(private routerExtensions: RouterExtensions, private userService: UserService) {
        // this.isRendering = true;
    }
    ngAfterContentInit(): void {
        // this.renderingTimeout = setTimeout(() => {
        //     this.isRendering = true;
        // }, 5000)
    }
    ngOnInit(): void {
        this.categories = [];
        this.isLoading = false;
        this.offerHeading = "SEASON'S SPECIAL"
        this.offer = "50% off*"
        this.userService.showFooter(true);
        this.userService.showHeader(true);
        this.userService.headerLabel("sabG");
        this.categories.push(
            { image: "res://vegetables", name: "Vagetables" },
            { image: "res://fresh_fruits", name: "Fresh Fruits" },
            { image: "res://organic", name: "Organic" },
            { image: "res://herbs", name: "Herbs" },
            { image: "res://pears", name: "Pears" },
            { image: "res://cut_fruits", name: "Cut fruits and Vegetables" },
        );
    }

    protected get shadowColor(): Color {
        return new Color('#888888')
    }

    protected get shadowOffset(): number {
        return 2.0
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
}