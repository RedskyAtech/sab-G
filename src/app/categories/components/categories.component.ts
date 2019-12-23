import { Component, OnInit, AfterContentInit } from "@angular/core";
import { Color } from "tns-core-modules/color/color";
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';
import { UserService } from "~/app/services/user.service";
import { Page } from "tns-core-modules/ui/page/page";
import * as localstorage from "nativescript-localstorage";
import { Values } from "~/app/values/values";
import { HttpClient } from "@angular/common/http";

declare const android: any;
declare const CGSizeMake: any;

@Component({
    selector: "ns-categories",
    moduleId: module.id,
    templateUrl: "./categories.component.html",
    styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit, AfterContentInit {

    // isRendering: boolean;
    isLoading: boolean;
    renderingTimeout;
    categories;
    offerHeading: string;
    offer: string;
    selectedPage: number;
    token: string;
    isCategories: boolean;
    categoryMessage: string;
    query: string;
    pageNo: number;
    items: number;
    constructor(private routerExtensions: RouterExtensions, private userService: UserService, private page: Page, private http: HttpClient) {
        this.page.actionBarHidden = true;
        // this.isRendering = true;

        this.page.on('navigatedTo', (data) => {
            if (data.isBackNavigation) {
                this.userService.headerLabel("All categories");
                this.userService.showBack("visible");
                this.userService.activeScreen("categories");
            }
        });

    }
    ngAfterContentInit(): void {
        // this.renderingTimeout = setTimeout(() => {
        //     this.isRendering = true;
        // }, 5000)
    }
    ngOnInit(): void {
        this.categories = [];
        this.isLoading = false;
        this.userService.headerLabel("All categories");
        this.userService.showBack("visible");
        this.userService.activeScreen("categories");
        this.selectedPage = 0;
        this.token = "";
        this.isCategories = true;
        this.categoryMessage = "";
        this.query = "";
        this.pageNo = 1;
        this.items = 10;
        if (localstorage.getItem("token") != null && localstorage.getItem("token") != undefined) {
            this.token = localstorage.getItem("token");
            this.getCategories();
        }
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

    getCategories() {
        this.query = `pageNo=${this.pageNo}&items=${this.items}&status=active`
        this.isLoading = true;
        this.http
            .get(Values.BASE_URL + "categories?" + this.query, {
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": this.token
                }
            })
            .subscribe((res: any) => {
                if (res != null && res != undefined) {
                    if (res.isSuccess == true) {
                        console.trace(res);
                        if (res.data.category.length > 0) {
                            this.isCategories = true;
                            this.categoryMessage = "";
                            for (var i = 0; i < res.data.category.length; i++) {
                                this.categories.push({
                                    id: res.data.category[i]._id,
                                    name: res.data.category[i].name,
                                    imageUrl: res.data.category[i].image.url,
                                    thumbnail: res.data.category[i].thumbnail,
                                    resize_url: res.data.category[i].resize_url,
                                    resize_thumbnail: res.data.category[i].resize_thumbnail
                                });
                            }
                            this.isLoading = false;
                            this.pageNo = this.pageNo + 1;
                            this.getCategories();
                        }
                        else {
                            if (this.pageNo == 1) {
                                this.isCategories = false;
                                this.categoryMessage = "There is no categories.";
                            }
                        }
                        this.isLoading = false;
                    }
                }
            }, error => {
                this.isLoading = false;
                console.log("ERROR::::", error.error.error);
            });
    }

    onCategoryClick(item: any) {
        this.routerExtensions.navigate(['/products'], {
            queryParams: {
                "categoryName": item.name,
                "categoryId": item.id
            },
        });
        localstorage.setItem("categoryId", item.id);
    }
}
