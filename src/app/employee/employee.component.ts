import { Component, Self } from '@angular/core';
import { RoomsService } from '../rooms/services/rooms.service';

@Component({
  selector: 'taj-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.scss'],
  providers: [RoomsService] /*
  *Singleton service : used specifically for this employee class . . . .
  *The constructor inside the RoomServices is getting called for this provider*/
})
export class EmployeeComponent {
  employeeName: string = 'Jay';

  constructor(@Self() private roomsServices : RoomsService) { }

  /** @Self() : will tell that search the provider in this ts file itself, and will not consider the providers of any parent component
   *
   * here if we remove the 'providers' from metadata it will throw error even if 'providIn=root'
   */
}
