import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'hinv-rooms-booking',
  templateUrl: './rooms-booking.component.html',
  styleUrls: ['./rooms-booking.component.scss']
})
export class RoomsBookingComponent implements OnInit {

  constructor(private router: ActivatedRoute) {

  }

  id: number = 0;

  // id$ !: Observable<Number>;
  id$ = this.router.paramMap.pipe(map((params) => params.get('roomId')))

  ngOnInit(): void {
    // this.router.params.subscribe((params) => {
    //   // console.log(params['roomId'])
    //   this.id = params['roomId'];
    // });
    // this.id = this.router.snapshot.params['roomId'];
    // this.id$ = this.router.params.pipe(
    //   map(params => params['roomId'])
    // )

    // this.id$ = this.router.paramMap.pipe(map(params) => params.get('roomId'))
  }

}
