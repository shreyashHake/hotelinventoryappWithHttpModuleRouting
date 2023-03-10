import { Component, AfterContentChecked, ContentChild, Host } from '@angular/core';
import { EmployeeComponent } from '../employee/employee.component';
import { LoggerService } from '../logger.service';
@Component({
  selector: 'taj-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
  providers: [LoggerService]
})

export class ContainerComponent implements AfterContentChecked {

  @ContentChild(EmployeeComponent) employee!: EmployeeComponent;
  newName: string = 'Malhar';

  constructor(@Host() loggerService: LoggerService) {  }
  /**@Host() : will tell that this is where the search ends
   * and will not search in parent components
  */

  ngAfterContentChecked(): void {
    console.log(this.employee);
    this.employee.employeeName = this.newName;
  }

}
