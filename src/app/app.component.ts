import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {FormControl, Validators} from "@angular/forms";
import {debounceTime, map, of, Subject, switchMap, takeUntil} from "rxjs";
import {GithubServiceService} from "./github-service.service";
import {AlertInterface} from "./model/interfaces";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements OnInit, OnDestroy{
    usernameSearchInput: FormControl = new FormControl('', [Validators.required, Validators.pattern(/^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i)]);
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    loading: boolean = false;
    alert: AlertInterface = {
        show: false,
        type: 'error',
        message: ''
    };
    constructor(
        private title: Title,
        private githubServiceService: GithubServiceService,
        private changeDetectorRef: ChangeDetectorRef
    ) {
        title.setTitle('GitHub Gists');
    }

    ngOnInit() {
        this.usernameSearchInput.valueChanges.pipe(
            takeUntil(this._unsubscribeAll),
            debounceTime(300),
            switchMap((query) => {
                this.loading = true;
                this.alert.show = false;

                if (this.usernameSearchInput.invalid){
                    return of (null);
                }

                this.githubServiceService.getUserDetails$(query).pipe(
                    takeUntil(this._unsubscribeAll)
                )
                    .subscribe();

                return this.githubServiceService.getUserGists$(query).pipe(
                    takeUntil(this._unsubscribeAll),
                    map( (response) => {
                        if (200 !== response.status){
                            this.alert.message = String(response.message);
                            this.alert.show = true;
                        }

                        this.changeDetectorRef.markForCheck();
                    })
                );
            }),
            map(() => {
                this.loading = false;
            })
        )
            .subscribe();
    }

    ngOnDestroy() {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    clearData() {
        this.alert.show = false;
        this.usernameSearchInput.setValue('');
        this.githubServiceService.clearUsersAndGists();
    }
}
