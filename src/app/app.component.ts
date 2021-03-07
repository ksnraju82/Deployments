import { Component } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  projects = [];
  environments = [];
  releases = [];
  deployments = [];
  constructor(private apiService: ApiService) {}
  title = 'Deployments';

  ngOnInit() {
    Promise.all([this.getProjects(), this.getEnvironments(), this.getReleases(), this.getDeployments()]).then(() => {
      if (this.releases && this.deployments && this.environments && this.projects) {
        
      }
    });
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
