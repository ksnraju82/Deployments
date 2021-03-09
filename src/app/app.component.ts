import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { throwError } from 'rxjs';
import { LogService } from './log.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // variables to read JSON data
  projects = [];
  environments = [];
  releases = [];
  deployments = [];

  title = "Deployments";
 
  // array to save releases that were deployed
  deployedReleases = [];
  // array to save redundant releases which were not deployed
  nonDeployedReleases = [];
  // user input to filter number of releases
  noOfReleases = 5;  

  activeReleases = [];
  deletedReleases = [];

  constructor(private apiService: ApiService,
              private loggger: LogService) {}

  ngOnInit() {
    // load the data to respective array before filtering top n releases.
    Promise.all([this.getProjects(), this.getEnvironments(), this.getReleases(), this.getDeployments()]).then(() => {
      if (this.releases && this.deployments && this.environments && this.projects) {
        this.getActiveReleasesByNumber(this.noOfReleases);
      }
    }, error => {
      this.loggger.error(error);
    });
  }

  getActiveReleasesByNumber(n: number) {   
    const promise = new Promise((resolve, reject) => {
      this.activeReleases = [];
      Promise.all([ this.getActiveReleases(), this.getRedundentReleases()]).then(() => {
        if (n > this.deployedReleases?.length) {
          // out of range exception
            this.loggger.error('Out of range error. Please provide a lesser number');
            throwError('Out of range error. Please provide a lesser number');
        } else if(n <= 0) {
          // negative number exception        
          this.loggger.error('Please provide a number greated than 0');
          throwError('Please provide a number greated than 0');
        } else if(n > 0 && n < this.deployedReleases?.length) {
          this.activeReleases = this.deployedReleases.slice(0, n);
          this.loggger.log('Number of Releases to Retain :');
          this.loggger.log(this.activeReleases);        
          this.loggger.log('Number of Releases to Delete :');
          this.deletedReleases = this.deployedReleases.splice(n, this.deployedReleases.length - n);
          this.loggger.log(this.deletedReleases);
        }
        resolve(this.activeReleases.length);
      }, error => {
        this.loggger.error(error);
        reject(error);
      });
    });
    return promise;
  }
 

  getActiveReleases() {
    const promise = new Promise((resolve) => {

      this.deployedReleases = [];

      this.releases.forEach(release => {
        if (this.deployments?.findIndex(deployment => deployment.ReleaseId === release.Id) > -1) {
            if (this.checkforDuplicateReleasesinRetainedList(release.Id)) {
            // Deployed releases
            this.deployedReleases.push(release);
          }
        }
      });
      resolve(true);
     });    
    this.loggger.log('Retain Releases :');
    this.loggger.log(this.deployedReleases);
    return promise;
  }

  getRedundentReleases() {
    const promise = new Promise((resolve) => { 
      this.nonDeployedReleases = [];

      this.releases.forEach(release => {
        if (this.deployments?.findIndex(deployment => deployment.ReleaseId === release.Id) === -1) {
          // nonDeployed releases
          this.nonDeployedReleases.push(release);       
        }
      });
      resolve(true);
    });
    
    this.loggger.log('Redundent Releases :');
    this.loggger.log(this.nonDeployedReleases);
    return promise;
  }

  checkforDuplicateReleasesinRetainedList(ReleaseID: string) {
    if (this.deployedReleases?.findIndex(release => release.Id === ReleaseID) > -1) {
      return false;
    }
    return true;
  }
  
  getProjects() {
    const promise = new Promise((resolve, reject) =>{
      this.apiService.getProjects().subscribe((data: any[])=>{			
        this.projects = data;  
        this.loggger.log('Fetched projects');
        resolve(true);
      }, error => {
        this.loggger.error(error);
        reject(false);
      }); 
    });
    return promise;
  }

  getEnvironments() {
    const promise = new Promise((resolve, reject) =>{
      this.apiService.getEnvironments().subscribe((data: any[])=>{ 			
        this.environments = data;  
        this.loggger.log('Fetched Environments');
        resolve(true);
      }, error => {
        this.loggger.error(error);
        reject(false);
      });  
    });
    return promise;
  }

  getReleases() {
    const promise = new Promise((resolve, reject) =>{
      this.apiService.getReleases().subscribe((data: any[])=>{  			
        this.releases = data;  
        this.loggger.log('Fetched Releases');
        resolve(true);
      }, error => {
        this.loggger.error(error);
        reject(false);
      });  
     });
    return promise;
  }

  getDeployments() {
    const promise = new Promise((resolve, reject) =>{ 
      this.apiService.getDeployments().subscribe((data: any[])=>{  			
        this.deployments = data;  
        this.loggger.log('Fetched Deployments');
        resolve(true)
      }, error => {
        this.loggger.error(error);
        reject(false);
      });  
    });
    return promise;
  }
}
