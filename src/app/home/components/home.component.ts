import { Component, OnInit, AfterContentInit, ViewChild } from "@angular/core";
import { RouterExtensions } from 'nativescript-angular/router/router-extensions';
import { UserService } from "../../services/user.service";

declare const android: any;
declare const CGSizeMake: any;

@Component({
    selector: "ns-home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterContentInit {


    constructor(private routerExtensions: RouterExtensions) {
    }

    ngOnInit(): void {
    }

    ngAfterContentInit(): void {

    }
}