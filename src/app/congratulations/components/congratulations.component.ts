import { Component, OnInit, AfterContentInit } from "@angular/core";
import { Color } from "tns-core-modules/color/color";
import { TextField } from "tns-core-modules/ui/text-field";
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';
import { UserService } from "~/app/services/user.service";
import { stringify } from "@angular/core/src/util";

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
    constructor(private routerExtensions: RouterExtensions, private userService: UserService) {
        // this.isRendering = true;
    }
    ngAfterContentInit(): void {
        // this.renderingTimeout = setTimeout(() => {
        //     this.isRendering = true;
        // }, 5000)
    }
    ngOnInit(): void {
        this.isLoading = false;
        this.userService.showFooter(false);
        this.userService.showHeader(false);
        this.gotItButton = "Got It!";
    }

    onGotItClick() {
        alert("got it clicked");
    }
}