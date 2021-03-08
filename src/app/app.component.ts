import { Component } from '@angular/core';
import { ApiService } from './api.service';
import { throwError } from 'rxjs';

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
  retainReleases = [];
  // array to save redundant releases which were not deployed
  redundentReleases = [];
  // user input to filter number of releases
  numberOfReleasesToRetain = -5;

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    // load the data to respective array before filtering top n releases.
    Promise.all([this.getProjects(), this.getEnvironments(), this.getReleases(), this.getDeployments()]).then(() => {
      if (this.releases && this.deployments && this.environments && this.projects) {
        this.getTopnReleasesThatwereDeployed(this.numberOfReleasesToRetain);
      }
    });
  }

  getTopnReleasesThatwereDeployed(n: number) {
    try {
      let returnNReleases = [];
      this.retainReleases = [];
      this.redundentReleases = [];
      this.releases.forEach(release => {
        if (this.deployments.findIndex(deployment => deployment.ReleaseId === release.Id) === -1) {
          // delete the release
          this.redundentReleases.push(release);
        } else {
          if (this.checkforDuplicateReleasesinRetainedList(release.Id)) {
            // retain releases
            this.retainReleases.push(release);
          }
        }
      });
      if (n > this.retainReleases.length - 1) {
        // out of range exception
         throwError('Out of range error. Please provide a lesser number');
      } else if(n <= 0) {
        // negative number exception
        throwError('Please provide a number greated than 0')
      } else if(n > 0 && n < this.retainReleases.length) {
        returnNReleases = this.retainReleases.slice(0, n);
      }
      console.log(returnNReleases);
    } catch (error) {
      throw error;
    }
  }

  checkforDuplicateReleasesinRetainedList(ReleaseID: string) {
    if (this.retainReleases.findIndex(release => release.Id === ReleaseID) > -1) {
      return false;
    }
    return true;
  }
  
  getProjects() {
    const promise = new Promise((resolve, reject) =>{
      this.apiService.getProjects().subscribe((data: any[])=>{			
        this.projects = data;  
        resolve(true);
      }, error => {
        console.log(error);
        reject(false);
      }); 
    });
    return promise;
  }

  getEnvironments() {
    const promise = new Promise((resolve, reject) =>{
      this.apiService.getEnvironments().subscribe((data: any[])=>{ 			
        this.environments = data;  
        resolve(true);
      }, error => {
        console.log(error);
        reject(false);
      });  
    });
    return promise;
  }

  getReleases() {
    const promise = new Promise((resolve, reject) =>{
      this.apiService.getReleases().subscribe((data: any[])=>{  			
        this.releases = data;  
        resolve(true);
      }, error => {
        console.log(error);
        reject(false);
      });  
     });
    return promise;
  }

  getDeployments() {
    const promise = new Promise((resolve, reject) =>{ 
      this.apiService.getDeployments().subscribe((data: any[])=>{  			
        this.deployments = data;  
        resolve(true)
      }, error => {
        console.log(error);
        reject(false);
      });  
    });
    return promise;
  }
}
