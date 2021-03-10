# Deployments
# Deployments

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Application architecture

The sample JSON files are copied to database.json file in Server folder.
json-server will watch the database.json file for data to be processed.
web Api calls were used to read data from database.json files and save them to memory(Arrays)
The service calls were Injected to App.Component.ts
All the execution steps were logged using logger class which was injected to App.Component.ts
Unit tests were written using Jasmine framework


## Execution steps 

1. npm install
## The following command will host the json-server and listens at port 3000
2. json-server --watch ./server/database.json
## run the test 
3. ng test
## run the application
4. ng serve
