import { User } from './../../models/user.model';
import { Component, OnInit, AfterContentInit } from "@angular/core";
import { Color } from "tns-core-modules/color/color";
import { TextField } from "tns-core-modules/ui/text-field";
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';
import { UserService } from "~/app/services/user.service";
import { Page } from "tns-core-modules/ui/page/page";
import { HttpClient } from '@angular/common/http';
import * as localstorage from "nativescript-localstorage";
import * as Toast from 'nativescript-toast';
import { openApp } from "nativescript-open-app";
import * as utils from "tns-core-modules/utils/utils";
import { Values } from '~/app/values/values';

declare const android: any;
declare const CGSizeMake: any;

@Component({
    selector: "ns-faq",
    moduleId: module.id,
    templateUrl: "./faq.component.html",
    styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit, AfterContentInit {

    // isRendering: boolean;
    isLoading: boolean;
    questionText: string;
    questionHint: string;
    questionBorderColor: string;
    questionBorderWidth: string;
    renderingTimeout;
    token: string;
    user: User;
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
        this.questionText = "";
        this.questionHint = "Enter your question here";
        this.questionBorderColor = "#707070";
        this.questionBorderWidth = "1";
        this.userService.headerLabel("FAQ");
        this.userService.activeScreen("faq");
        this.user = new User();
        this.token = "";
        if (localstorage.getItem("token") != null && localstorage.getItem("token") != undefined) {
            this.token = localstorage.getItem("token");
        }
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

    public questionTextField(args) {
        var textField = <TextField>args.object;
        this.questionText = textField.text;
    }

    onSubmitClick() {
        if (this.questionText == "") {
            alert("Please enter your question.");
        }
        else {
            this.user.question = this.questionText;
            this.user.userId = localstorage.getItem("userId");
            console.log(this.user);
            this.isLoading = true;
            this.http
                .post(Values.BASE_URL + "faq", this.user, {
                    headers: {
                        "Content-Type": "application/json",
                        "x-access-token": this.token
                    }
                })
                .subscribe((res: any) => {
                    if (res != null && res != undefined) {
                        if (res.isSuccess == true) {
                            this.isLoading = false;
                            this.routerExtensions.navigate(['/menu']);
                            Toast.makeText("Your query is successfully submitted.", "long").show();
                        }
                    }
                }, error => {
                    this.routerExtensions.navigate(['/menu']);
                    this.isLoading = false;
                    console.log("ERROR::::", error.error.error);
                });
        }
    }

    onFacebook() {
        // openApp("https://www.facebook.com/SabG-102840824401535/", false);
        // if (!installed) {
        utils.openUrl("https://www.facebook.com/SabG-102840824401535/");
        // }
    }

    onInstagram() {
        utils.openUrl("https://instagram.com/sabginfo?igshid=3guootxr5xlw");
    }

}