import {Component, OnInit} from '@angular/core';
import {GithubServiceService} from "../github-service.service";
import {GithubUser} from "../model/interfaces";
import {Observable, of} from "rxjs";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit{
    user$: Observable<GithubUser|null> = of(null);
    constructor(
        private githubServiceService: GithubServiceService
    ) {
    }

    ngOnInit() {
        this.user$ = this.githubServiceService.$user;
    }
}
