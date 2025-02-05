import { Component } from '@angular/core';

@Component({
  selector: 'app-flash-messages',
  imports: [],
  templateUrl: './flash-messages.component.html',
  styleUrl: './flash-messages.component.scss'
})
export class FlashMessagesComponent {

  message:string = ""

  getMessage(messageToDisplay:string){
    this.message = messageToDisplay
    return this.message
  }

}
