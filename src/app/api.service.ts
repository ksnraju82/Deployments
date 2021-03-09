import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';

import {  throwError } from 'rxjs';
import {  catchError } from 'rxjs/operators';
import { LogService } from './log.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private projectURL = "http://localhost:3000/projects";
  private environmentURL = "http://localhost:3000/environments";
  private releaseURL = "http://localhost:3000/releases";
  private deploymentsURL = "http://localhost:3000/deployments";

  constructor(private httpClient: HttpClient,
              private logger: LogService) { }

  handleError(error: HttpErrorResponse) {
    this.logger.error('Unknown error!');
    if (error.error instanceof ErrorEvent) {
      // Client-side errors      
      this.logger.error(`Error: ${error.error.message}`);
    } else {
      // Server-side errors      
      this.logger.error(`Error Code: ${error.status}\nMessage: ${error.message}`);
    }
    window.alert(`Error: ${error.error.message}`);
    return throwError(`Error: ${error.error.message}`);
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
