import { style } from '@angular/animations';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ElementRef,
  Optional,
  Inject,
} from '@angular/core';
import { LoggerService } from './logger.service';
import { RoomsComponent } from './rooms/rooms.component';
import { LocalStorageToken } from './localstorage.token';
import { InitService } from './init.service';

@Component({
  selector: 'taj-root',

  templateUrl: './app.component.html',
  styles: [
    `
      h1 {
        color: red;
      }
    `,
  ],
})
export class AppComponent implements OnInit {
  title = 'hotelinventoryapp';

  role = 'Admin';

  @ViewChild('name', { static: true }) name!: ElementRef;

  constructor(
    @Optional() private loggerServices: LoggerService,

    @Inject(LocalStorageToken) private localStorage: any, 
    private intiService : InitService,
  ) {
    console.log('InItService : ' ,intiService.config );
  }


  ngOnInit() {
    console.log(this.name);
    this.name.nativeElement.innerText = 'Angular Says hello !';
    this.localStorage.setItem('name', 'Taj Hotels');
  }
}
