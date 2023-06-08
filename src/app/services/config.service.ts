import { Inject, Injectable } from '@angular/core';
import { RouteConfigToken } from './routeConfig.services';
import { RouteConfig } from './routeConfig';

@Injectable({
  providedIn: 'any'
})
export class ConfigService {

  constructor(@Inject(RouteConfigToken) private configToken: RouteConfig) {
    console.log('Config Services');
    console.log(this.configToken);

  }
}
