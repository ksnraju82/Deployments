import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import {  throwError } from 'rxjs';
import {  catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private projectURL = "http://localhost:3000/projects";
  private environmentURL = "http://localhost:3000/environments";
  private releaseURL = "http://localhost:3000/releases";
  private deploymentsURL = "http://localhost:3000/deployments";

  constructor(private httpClient: HttpClient) { }

  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  public getProjects(){
    return this.httpClient.get(this.projectURL).pipe(catchError(this.handleError));
  }
  public getEnvironments(){
    return this.httpClient.get(this.environmentURL).pipe(catchError(this.handleError));
  }
  public getReleases(){
    return this.httpClient.get(this.releaseURL).pipe(catchError(this.handleError));
  }
  public getDeployments(){
    return this.httpClient.get(this.deploymentsURL).pipe(catchError(this.handleError));
  }
}
