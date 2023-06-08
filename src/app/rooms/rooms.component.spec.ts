import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomsComponent } from './rooms.component';
import { RoomsService } from './services/rooms.service';
import { ConfigService } from '../services/config.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { APP_SERVICE_CONFIG } from '../AppConfig/appconfig.service';
import { RouteConfigToken } from '../services/routeConfig.services';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../header/header.component';
import { HeaderModule } from '../header/header.module';

describe('RoomsComponent', () => {
  let component: RoomsComponent;
  let fixture: ComponentFixture<RoomsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterModule, ReactiveFormsModule, HeaderModule],
      declarations: [RoomsComponent],
      providers: [RoomsService, ConfigService, {
        provide: APP_SERVICE_CONFIG,
        useValue: { apiEndpoint: 'http://localhost:3000' },
      },
        {
          provide: RouteConfigToken,
          useValue: { title: 'Home' },
        }]
    });
    fixture = TestBed.createComponent(RoomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should toggle', () => {
    component.hide = false;
    component.toggle();
    expect(component.hide).toBe(true);
  })
});
