import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    ViewEncapsulation
} from '@angular/core';
import {map, Observable, of, Subject, takeUntil} from "rxjs";
import {Gist, GistFile} from "../model/interfaces";
import {GithubServiceService} from "../github-service.service";
import _ from "lodash";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
    selector: 'app-user-gists',
    templateUrl: './user-gists.component.html',
    styleUrls: ['./user-gists.component.scss'],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserGistsComponent implements OnInit, OnDestroy{
    gists$: Observable<Gist[]|null> = of(null);
    private _unsubscribeAll: Subject<any> = new Subject<any>();
    forks: any = {};
    code: any = {};
    constructor(
        private githubServiceService: GithubServiceService,
        private _sanitizer:DomSanitizer,
        private changeDetectorRef: ChangeDetectorRef
    ) {
    }

    ngOnInit() {
        this.gists$ = this.githubServiceService.$gists;
    }

    ngOnDestroy() {
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    trackByFn(index: number): any
    {
        return index;
    }

    getGistRawCode(file: GistFile) {
        return this._sanitizer.bypassSecurityTrustHtml(file.content);
    }

    showGistDetails(gist: Gist) {
        if (!_.has(this.forks, gist.id)){
            this.githubServiceService.getGistDetails$(gist.url).pipe(
                takeUntil(this._unsubscribeAll),
                map( (response) => {
                    if (200 === response.status){
                        this.code[gist.id] = _.values(response.body.files);
                        this.forks[gist.id] = response.body.forks;
                        this.forks[gist.id].push(response.body.forks[0]);
                    }

                    this.changeDetectorRef.markForCheck();
                })
            )
                .subscribe()
        }
    }
}
