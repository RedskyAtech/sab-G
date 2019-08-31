import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class UserService {
    private _playbuttonState = new Subject<boolean>();
    private _showloadingState = new Subject<boolean>();
    private _showquizResult = new Subject<boolean>();
    private _activescreen = new Subject<string>();
    private _showfooter = new Subject<boolean>();
    private _showheader = new Subject<boolean>();
    private _headerlabel = new Subject<string>();

    playbuttonState = this._playbuttonState.asObservable();
    showloadingState = this._showloadingState.asObservable();
    showquizResult = this._showquizResult.asObservable();
    activescreen = this._activescreen.asObservable();
    showfooter = this._showfooter.asObservable();
    showheader = this._showheader.asObservable();
    headerlabel = this._headerlabel.asObservable();
    
    constructor() { }

    playButtonState(state: boolean) {
        this._playbuttonState.next(state);
    }

    showLoadingState(state: boolean) {
        this._showloadingState.next(state);
    }

    showQuizResult(state: boolean) {
        this._showquizResult.next(state);
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
}