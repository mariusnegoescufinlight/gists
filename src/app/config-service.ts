import {Injectable} from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    private readonly baseApiUrl = 'https://api.github.com';
    getListUserGistsLink(username: string){
        return this.baseApiUrl + '/users/' + username + '/gists';
    }
    getUserDetails(username: string){
        return this.baseApiUrl + '/users/' + username;
    }
}
