import { Component, AfterContentInit, ContentChild, Host } from '@angular/core';
import { EmployeesComponent } from '../employees/employees.component';
import { RoomsService } from '../rooms/services/rooms.service';

@Component({
  selector: 'hinv-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  // providers: [RoomsService]
})
export class ContainerComponent implements AfterContentInit {

  // constructor(@Host() private roomService: RoomsService) {}
  constructor() { }

  @ContentChild(EmployeesComponent) employee!: EmployeesComponent;

  ngAfterContentInit(): void {
    this.employee.empName = "Virat"
  }

}
