import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-add-channel',
  templateUrl: './add-channel.component.html',
  styleUrls: ['./add-channel.component.css']
})
export class AddChannelComponent implements OnInit {
  @Output()
  addChannel: EventEmitter<string> = new EventEmitter<string>();
  channelName: string;

  constructor() {}

  ngOnInit() {
    this.channelName = null;
  }

  add() {
    if (this.channelName) {
      this.addChannel.emit(this.channelName);
      this.channelName = null;
    }
  }
}
