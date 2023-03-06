import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { UserInfoComponent } from './user-info/user-info.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { UserGistsComponent } from './user-gists/user-gists.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {GithubAuthenticationInterceptor} from "./github-authentication.interceptor";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatCardModule} from "@angular/material/card";

@NgModule({
    declarations: [
        AppComponent,
        UserInfoComponent,
        UserGistsComponent
    ],
    imports: [
        BrowserModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        FormsModule,
        BrowserAnimationsModule,
        MatProgressBarModule,
        HttpClientModule,
        MatIconModule,
        MatButtonModule,
        MatExpansionModule,
        MatCardModule
    ],
  providers: [
      {
          provide: HTTP_INTERCEPTORS,
          useClass: GithubAuthenticationInterceptor,
          multi: true
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
