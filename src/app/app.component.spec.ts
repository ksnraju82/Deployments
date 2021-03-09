import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { ApiService } from './api.service';

describe('AppComponent', () => {
  let service: ApiService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      providers: [ApiService],
      declarations: [
        AppComponent
      ],      
    }).compileComponents();
    service = TestBed.inject(ApiService);
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Deployments'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance; 
    expect(app.title).toEqual('Deployments');
  });

  it('#getActiveReleasesValue should return value from a promise',
  (done: DoneFn) => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.getActiveReleases().then(value => {
    expect(value).toBeTrue();
    done();
  });
});

it('#getRedundentReleasesValue should return value from a promise',
  (done: DoneFn) => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.getRedundentReleases().then(value => {
    expect(value).toBeTrue();
    done();
  });
});

it('#getTopnReleasesThatwereDeployed should return value from a promise',
  (done: DoneFn) => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.getActiveReleasesByNumber(3).then(value => {
    expect(value).toBeTrue();
    done(); 
  });
});
  
});
