import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-add-channel',
  templateUrl: './add-channel.component.html',
  styleUrls: ['./add-channel.component.css']
})
export class AddChannelComponent implements OnInit {
  @Output()
  addChannel: EventEmitter<string> = new EventEmitter<string>();
  channelName: string;

  constructor(private _router: Router) {}

  ngOnInit() {
    this.channelName = null;
  }

  add() {
    if (this.channelName) {
      this.addChannel.emit(this.channelName);
      this.channelName = null;
    }
  }

  logout() {
    localStorage.clear();
    alert('You are logged out!!');
    this._router.navigate(['/']);
  }
}
