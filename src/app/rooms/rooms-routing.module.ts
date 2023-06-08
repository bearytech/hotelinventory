import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RoomsComponent } from './rooms.component';
import { RoomsAddComponent } from './rooms-add/rooms-add.component';
import { RoomsBookingComponent } from './rooms-booking/rooms-booking.component';
import { roomGuard } from './guards/room.guard';

const routes: Routes = [
  {
    // path: 'rooms', component: RoomsComponent,
    path: '', component: RoomsComponent, canActivateChild: [roomGuard],
    children: [
      { path: 'add', component: RoomsAddComponent },
      // { path: ':roomId', component: RoomsBookingComponent },
    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoomsRoutingModule { }
