import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class UserService {
    private _showloadingState = new Subject<boolean>();
    private _activescreen = new Subject<string>();
    private _showfooter = new Subject<boolean>();
    private _showheader = new Subject<boolean>();
    private _headerlabel = new Subject<string>();
    private _showback = new Subject<string>();
    private _showaddButton = new Subject<string>();

    showloadingState = this._showloadingState.asObservable();
    activescreen = this._activescreen.asObservable();
    showfooter = this._showfooter.asObservable();
    showheader = this._showheader.asObservable();
    headerlabel = this._headerlabel.asObservable();
    showback = this._showback.asObservable();
    showaddButton = this._showaddButton.asObservable();

    constructor() { }

    showLoadingState(state: boolean) {
        this._showloadingState.next(state);
    }

    activeScreen(screen: string) {
        this._activescreen.next(screen);
    }

    showFooter(state: boolean) {
        this._showfooter.next(state);
    }

    showHeader(state: boolean) {
        this._showheader.next(state);
    }

    headerLabel(label: string) {
        this._headerlabel.next(label);
    }

    showBack(state: string) {
        this._showback.next(state);
    }

    showAddButton(state: string) {
        this._showaddButton.next(state);
    }
}