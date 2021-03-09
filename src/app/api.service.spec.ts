import { TestBed } from '@angular/core/testing';
import {HttpClientModule} from '@angular/common/http';
import { ApiService } from './api.service';
import { exec } from 'child_process';

describe('ApiService', () => {
  let service: ApiService;
  let project1: any;
  let project2: any;

  project1 = '{"Id": "Project-1", "Name": "Random Quotes"}';
  project2 = '{"Id": "Project-2","Name": "Pet Shop"}'

  let projects = [project1, project2];
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [       
        HttpClientModule
      ]
    });
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  it('#getProjectsObservableValue should return value from observable',
  (done: DoneFn) => {
  service.getProjects().subscribe(value => {    
    expect(value[0].Id).toEqual('Project-1');
    expect(value[1].Id).toEqual('Project-2');
    done();
  }); 
});

it('#getEnvironmentsObservableValue should return value from observable',
  (done: DoneFn) => {
  service.getEnvironments().subscribe(value => {    
    expect(value[0].Name).toEqual('Staging');
    expect(value[1].Name).toEqual('Production');
    done();
  }); 
});

it('#getReleasesObservableValue should return value from observable',
  (done: DoneFn) => {
  service.getReleases().subscribe(value => {    
    expect(value[0].Id).toEqual('Release-1');
    expect(value[1].Id).toEqual('Release-2');
    done();
  }); 
});

it('#getDeploymentsObservableValue should return value from observable',
  (done: DoneFn) => {
  service.getDeployments().subscribe(value => {    
    expect(value[0].Id).toEqual('Deployment-1');
    expect(value[1].Id).toEqual('Deployment-2');    
    done();
  }); 
});
  
});
