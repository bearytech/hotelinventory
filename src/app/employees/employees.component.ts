import { Component, Self } from '@angular/core';
import { RoomsService } from '../rooms/services/rooms.service';

@Component({
  selector: 'hinv-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  providers: [RoomsService]
})
export class EmployeesComponent {
  empName: string = "Arif";
  constructor(private roomService: RoomsService) {

  }
}
