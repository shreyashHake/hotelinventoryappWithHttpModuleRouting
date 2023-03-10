import { Component , OnInit, Input} from '@angular/core';

@Component({
  selector: 'taj-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() title: any;

  constructor() {}

  ngOnInit(): void {
  }
}
