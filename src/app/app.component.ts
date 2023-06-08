import { Component, ViewChild, ElementRef, OnInit, Optional, Inject } from '@angular/core';
import { RoomsComponent } from './rooms/rooms.component';
import { LoggerService } from './logger.service';
import { LocalStorageToken } from './localstorage.token';
import { InitService } from './init.service';
import { ConfigService } from './services/config.service';
import { NavigationStart, Router } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'hinv-root',
  templateUrl: './app.component.html',
  // template: `<h1>hello world from template URL</h1>
  //   <p>Angular is Aswesome </p>
  // `,
  styleUrls: ['./app.component.scss']
  // styles: [`h1{color:Red;}`]
})
export class AppComponent implements OnInit {

  title = 'hotelinventoryapp';
  role = 'Admin';

  @ViewChild('name', { static: true }) nameRef!: ElementRef;

  constructor(@Optional() private loggerService: LoggerService,
    @Inject(LocalStorageToken) private localStorage: any,
    private initService: InitService,
    private configService: ConfigService,
    private router: Router
  ) {
    console.log(LocalStorageToken);
    console.log(initService.config);

  }

  ngOnInit(): void {
    // this.router.events.subscribe((event) => {
    //   console.log(event);

    // })
    this.router.events.pipe(
      filter((event) => event instanceof NavigationStart)
    ).subscribe((event) => {
      console.log('Navigation Started');
    })
    this.router.events.pipe(
      filter((event) => event instanceof NavigationStart)
    ).subscribe((event) => {
      console.log('Navigation Ended');
    })

    this.loggerService?.Log('AppComponent.ngOnInit()');
    this.nameRef.nativeElement.innerText = "abc hotel";
    this.localStorage.setItem('name', 'Arif')
  }

  // @ViewChild('user', { read: ViewContainerRef }) vcr!: ViewContainerRef;

  // ngAfterViewInit(): void {
  //   const ContainerRef = this.vcr.createComponent(RoomsComponent)
  //   ContainerRef.instance.NoOfRooms = 50;
  // }

}
