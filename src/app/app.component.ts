import { Component, OnInit, AfterContentInit, AfterViewInit } from "@angular/core";
import { RouterExtensions } from 'nativescript-angular/router/router-extensions'
import { Router } from "@angular/router";
import { UserService } from "./services/user.service";
import { registerElement } from 'nativescript-angular/element-registry';
import { Color } from "tns-core-modules/color/color";

declare const android: any;
declare const CGSizeMake: any;

@Component({
    selector: "ns-app",
    moduleId: module.id,
    templateUrl: "./app.component.html",
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterContentInit, AfterViewInit {


    searchColor = "#9E9E9E";
    quizColor = "#9E9E9E";
    topicsColor = "#273BD3";
    bookmarkColor = "#9E9E9E";
    accountColor = "#9E9E9E";
    homeIcon: string;
    profileIcon: string;
    searchIcon: string;
    menuIcon: string;
    cartIcon: string;

    showPlayButton: boolean;
    showLoading: boolean;
    showFooter: boolean;
    showHeader: boolean;

    isRendering: boolean;
    renderingTimeout;
    headerLabel: string;
    backIcon: string;

    constructor(private routerExtensions: RouterExtensions, private userService: UserService, private router: Router) {
        this.isRendering = false;
        this.backIcon = "res://back";
        this.homeIcon = "res://home_inactive";
        this.profileIcon = "res://user_inactive";
        this.searchIcon = "res://search_inactive";
        this.menuIcon = "res://menu_inactive";
        this.cartIcon = "res://cart_inactive";
        this.userService.showloadingState.subscribe((state: boolean) => {
            if (state != undefined) {
                this.showLoading = state;
            }
        });
        this.userService.showfooter.subscribe((state: boolean) => {
            if (state != undefined) {
                this.showFooter = state;
            }
        });
        this.userService.showheader.subscribe((state: boolean) => {
            if (state != undefined) {
                this.showHeader = state;
            }
        });
        this.userService.headerlabel.subscribe((label: string) => {
            if (label != undefined && label != null) {
                this.headerLabel = label;
            }
        })

        // this.userService.activescreen.subscribe((screen: string) => {
        // if (screen == "serach") {
        //     this.searchColor = "#273BD3";
        //     this.quizColor = "#9E9E9E";
        //     this.topicsColor = "#9E9E9E";
        //     this.bookmarkColor = "#9E9E9E";
        //     this.accountColor = "#9E9E9E";
        //     this.searchIcon = "res://search_blue";
        //     this.quizIcon = "res://quiz_grey";
        //     this.topicsIcon = "res://topic_grey";
        //     this.bookmarkIcon = "res://bookmark_grey";
        //     this.accountIcon = "res://account_grey";
        // }
        // if (screen == "quiz") {
        //     this.searchColor = "#9E9E9E";
        //     this.quizColor = "#273BD3";
        //     this.topicsColor = "#9E9E9E";
        //     this.bookmarkColor = "#9E9E9E";
        //     this.accountColor = "#9E9E9E";
        //     this.searchIcon = "res://search_grey";
        //     this.quizIcon = "res://quiz_blue";
        //     this.topicsIcon = "res://topic_grey";
        //     this.bookmarkIcon = "res://bookmark_grey";
        //     this.accountIcon = "res://account_grey";
        // }
        // if (screen == "home") {
        //     this.searchColor = "#9E9E9E";
        //     this.quizColor = "#9E9E9E";
        //     this.topicsColor = "#273BD3";
        //     this.bookmarkColor = "#9E9E9E";
        //     this.accountColor = "#9E9E9E";
        //     this.searchIcon = "res://search_grey";
        //     this.quizIcon = "res://quiz_grey";
        //     this.topicsIcon = "res://topic_blue";
        //     this.bookmarkIcon = "res://bookmark_grey";
        //     this.accountIcon = "res://account_grey";
        // }
        // if (screen == "bookmark") {
        //     this.searchColor = "#9E9E9E";
        //     this.quizColor = "#9E9E9E";
        //     this.topicsColor = "#9E9E9E";
        //     this.bookmarkColor = "#273BD3";
        //     this.accountColor = "#9E9E9E";
        //     this.searchIcon = "res://search_grey";
        //     this.quizIcon = "res://quiz_grey";
        //     this.topicsIcon = "res://topic_grey";
        //     this.bookmarkIcon = "res://bookmark_blue";
        //     this.accountIcon = "res://account_grey";
        // }
        // if (screen == "account") {
        //     this.searchColor = "#9E9E9E";
        //     this.quizColor = "#9E9E9E";
        //     this.topicsColor = "#9E9E9E";
        //     this.bookmarkColor = "#9E9E9E";
        //     this.accountColor = "#273BD3";
        //     this.searchIcon = "res://search_grey";
        //     this.quizIcon = "res://quiz_grey";
        //     this.topicsIcon = "res://topic_grey";
        //     this.bookmarkIcon = "res://bookmark_grey";
        //     this.accountIcon = "res://account_blue";
        // }
        // });
    }

    ngOnInit(): void {
    }

    ngAfterContentInit(): void {
        this.renderingTimeout = setTimeout(() => {
            this.isRendering = true;
        }, 50)
    }

    ngAfterViewInit(): void {
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
                nativeGridMain.setElevation(10)
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

    // onSearchTap() {
    //     this.searchColor = "#273BD3";
    //     this.quizColor = "#9E9E9E";
    //     this.topicsColor = "#9E9E9E";
    //     this.bookmarkColor = "#9E9E9E";
    //     this.accountColor = "#9E9E9E";
    //     this.searchIcon = "res://search_blue";
    //     this.quizIcon = "res://quiz_grey";
    //     this.topicsIcon = "res://topic_grey";
    //     this.bookmarkIcon = "res://bookmark_grey";
    //     this.accountIcon = "res://account_grey";
    //     this.routerExtensions.navigate(['/search']);
    // }

    // onQuizTap() {
    //     this.searchColor = "#9E9E9E";
    //     this.quizColor = "#273BD3";
    //     this.topicsColor = "#9E9E9E";
    //     this.bookmarkColor = "#9E9E9E";
    //     this.accountColor = "#9E9E9E";
    //     this.searchIcon = "res://search_grey";
    //     this.quizIcon = "res://quiz_blue";
    //     this.topicsIcon = "res://topic_grey";
    //     this.bookmarkIcon = "res://bookmark_grey";
    //     this.accountIcon = "res://account_grey";
    //     this.routerExtensions.navigate(['/quiz']);
    // }

    // onTopicsTap() {
    //     this.searchColor = "#9E9E9E";
    //     this.quizColor = "#9E9E9E";
    //     this.topicsColor = "#273BD3";
    //     this.bookmarkColor = "#9E9E9E";
    //     this.accountColor = "#9E9E9E";
    //     this.searchIcon = "res://search_grey";
    //     this.quizIcon = "res://quiz_grey";
    //     this.topicsIcon = "res://topic_blue";
    //     this.bookmarkIcon = "res://bookmark_grey";
    //     this.accountIcon = "res://account_grey";
    //     this.routerExtensions.navigate(['/home']);
    // }

    // onBookmarkTap() {
    //     this.searchColor = "#9E9E9E";
    //     this.quizColor = "#9E9E9E";
    //     this.topicsColor = "#9E9E9E";
    //     this.bookmarkColor = "#273BD3";
    //     this.accountColor = "#9E9E9E";
    //     this.searchIcon = "res://search_grey";
    //     this.quizIcon = "res://quiz_grey";
    //     this.topicsIcon = "res://topic_grey";
    //     this.bookmarkIcon = "res://bookmark_blue";
    //     this.accountIcon = "res://account_grey";
    //     this.routerExtensions.navigate(['/bookmark']);
    // }

    // onAccountTap() {
    //     this.searchColor = "#9E9E9E";
    //     this.quizColor = "#9E9E9E";
    //     this.topicsColor = "#9E9E9E";
    //     this.bookmarkColor = "#9E9E9E";
    //     this.accountColor = "#273BD3";
    //     this.searchIcon = "res://search_grey";
    //     this.quizIcon = "res://quiz_grey";
    //     this.topicsIcon = "res://topic_grey";
    //     this.bookmarkIcon = "res://bookmark_grey";
    //     this.accountIcon = "res://account_blue";
    //     this.routerExtensions.navigate(['/account']);
    // }
}