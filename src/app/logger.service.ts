import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  constructor() {
    console.log('@Optional() logger Service is called!');

  }

}
