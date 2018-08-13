import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-channel-list',
  templateUrl: './channel-list.component.html',
  styleUrls: ['./channel-list.component.css']
})
export class ChannelListComponent implements OnInit {
  @Input()
  list: any[];
  @Input()
  selectedItem: any;
  @Output()
  updateSelection: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
    this.list = [];
  }

  ngOnInit() {}

  select(channel: any) {
    this.updateSelection.emit(channel);
  }
}
