import { Component, OnInit, AfterContentInit, AfterViewInit } from "@angular/core";
import { RouterExtensions } from 'nativescript-angular/router/router-extensions'
import { Router } from "@angular/router";
import { UserService } from "./services/user.service";
import { registerElement } from 'nativescript-angular/element-registry';

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
    searchIcon = "res://search_grey";
    quizIcon = "res://quiz_grey";
    topicsIcon = "res://topic_blue";
    bookmarkIcon = "res://bookmark_grey";
    accountIcon = "res://account_grey";

    showPlayButton: boolean;
    showLoading: boolean;
    showFooter: boolean;

    isRendering: boolean;
    renderingTimeout;

    constructor(private routerExtensions: RouterExtensions, private userService: UserService, private router: Router) {
        this.isRendering = false;
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