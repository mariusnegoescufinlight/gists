import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {ConfigService} from "./config-service";
import {BehaviorSubject, catchError, map, Observable, of} from "rxjs";
import {Gist, GistFile, GithubUser, ServiceResponse} from "./model/interfaces";
import _ from "lodash";

@Injectable({
  providedIn: 'root'
})
export class GithubServiceService {

    private _gists: BehaviorSubject<Gist[] | null> = new BehaviorSubject<Gist[]|null>(null);
    private _user: BehaviorSubject<GithubUser | null> = new BehaviorSubject<GithubUser | null>(null);

    constructor(
      private httpClient: HttpClient,
      private config: ConfigService
    ) { }

    get $user(): Observable<GithubUser|null>{
        return this._user.asObservable();
    }
    get $gists(): Observable<Gist[]|null>{
        return this._gists.asObservable();
    }

    getUserGists$(username: string): Observable<ServiceResponse>{
        return this.httpClient.get(this.config.getListUserGistsLink(username), {observe: "response", params: {per_page: 100}}).pipe(
            catchError( this.catchError),
            map( (response) => {

                response.body =  this.processUserGist(response.body);

                if (200 === response.status) {
                    this._gists.next(response.body);
                }

                return response;
            })
        );
    }

    getUserDetails$(username: string): Observable<ServiceResponse>{
        return this.httpClient.get(this.config.getUserDetails(username), {observe: "response"}).pipe(
            catchError(this.catchError),
            map( (response) => {
                if (200 === response.status){
                    this._user.next(response.body);
                }

                return response;
            }),
        )
    }

    getGistDetails$(url: string): Observable<any>{
        return this.httpClient.get(url, {observe: "response"}).pipe(
            catchError(this.catchError),
            map( (response) => {
                return response;
            })
        )
    }

    private processUserGist(body: Gist[]){
        return _.map(body, (gist: Gist) => {
            gist.files = _.values(_.map(gist.files, (file: GistFile) => {
                file.badge = (Math.random() * 10).toFixed(0);

                return file;
            }));

            return gist;
        });
    }

    catchError(response: HttpErrorResponse): Observable<any>{
        let result: ServiceResponse = {
            status: response.status,
            message: response.message,
        };
        return of(result);
    }

    clearUsersAndGists(){
        this._gists.next(null);
        this._user.next(null);
    }
}
