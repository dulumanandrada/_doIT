import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { IMessage } from 'src/app/models/message';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnChanges {
  currentUser: string = sessionStorage.getItem('user') as string
  @Input() messages: IMessage[] = []
  @Output() messageToSend = new EventEmitter<string>();
  @Output() visible = new EventEmitter<boolean>();
  message: string = ''


  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes['messages']);
  }

  closeMessageOwner() {
    this.message = ''
    this.visible.emit(false)
  }

  cancelMessage() {
    this.message = ''
    this.visible.emit(false)
  }

  sendMessage() {
    this.messageToSend.emit(this.message)
    this.message = ''
  }
}
