# App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.2.1.

## Install

Run `npm install` to install the package dependencies

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## What has been done

The user can fill in the username and the user details and the public gists from the user are collected. You can use the src/environments/environments.ts and environments.prod.ts to add your own github token.

## What technical decisions have been taken

The app has been split between: 
1. a main component which has the username field to control the user details and user gists. This also includes the components for these sections.
2. user details info is a separate component
3. user gists info is a separate component
4. username field validation to what github requests
5. a interceptor has been added to add GitHub token if added in the environments
6. a service has been added to deal with requests to GitHub
7. a config service has been added to deal with GitHub urls
8. badges are randomly added to gists files

## What optimizations have been done

Forks are loaded when the user clicks on one of the gists

## What would be the next steps

1. add pagination for the gists 
2. possibly add pagination for the forks
3. add tests
