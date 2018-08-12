import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatService } from '../chat.service';
import { userInfo } from 'os';
import { callbackify } from 'util';

@Component({
  selector: 'app-chatme',
  templateUrl: './chatme.component.html',
  styleUrls: ['./chatme.component.css']
})
export class ChatmeComponent implements OnInit {
  channel: string;
  searchChannelPanelDetails: {
    list: any[];
    show: boolean;
    infoMsg: string;
  };
  joinChannelDetails: {
    channel: any;
    show: boolean;
  };
  channelList: any[];
  selectedChannel: any;
  arrayLen;
  fChannId: string;
  message: string;
  messageSet: Array<any>;
  foundChannel: string;
  searchedchannel: string;

  constructor(private router: Router, private _chatService: ChatService) {}
  // Authenticate() {
  //   this._chatService.setJson().subscribe(response => {
  //     console.log(response)
  //   },
  //     err => {
  //       console.log(err);
  //     });
  // }

  ngOnInit() {
    this.channel = null;
    this.searchChannelPanelDetails = {
      list: [],
      show: false,
      infoMsg: ''
    };
    this.joinChannelDetails = {
      channel: null,
      show: false
    };
    this.channelList = [];
    this.getAllChannel();
    setInterval(() => {
      if (this.selectedChannel && this.selectedChannel.sid) {
        this.getAllMessages(this.selectedChannel.sid);
      }
    }, 5000);
  }

  addChannel(channelName: string) {
    if (channelName) {
      this._chatService.addChannel(channelName).subscribe(
        res => {
          this.joinChannel(res);
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  checkMemberInChannel(memberList: any[]) {
    for (const member of memberList) {
      if (member.identity === this._chatService.identity) {
        return true;
      }
    }
    return false;
  }

  getAllChannel() {
    this._chatService.getAllChannels().subscribe(
      (res: any) => {
        for (const channel of res.channels) {
          if (channel.members_count) {
            this._chatService
              .getAllMembersOfChannel(channel.sid)
              .subscribe((response: any) => {
                if (this.checkMemberInChannel(response.members)) {
                  this.channelList.push(channel);
                }
              });
          }
        }
      },
      (error: any) => {}
    );
  }

  searchChannel(channel: string) {
    this.searchChannelPanelDetails.infoMsg = null;
    if (channel) {
      this._chatService.getAllChannels().subscribe(
        res => {
          this.searchChannelPanelDetails.list = [];
          this.searchChannelPanelDetails.show = true;
          for (const item of res.channels) {
            if (
              item.unique_name.toLowerCase().includes(channel.toLowerCase())
            ) {
              this.searchChannelPanelDetails.list.push(item);
            }
          }
          if (!this.searchChannelPanelDetails.list.length) {
            this.searchChannelPanelDetails.infoMsg = 'No record found';
          }
        },
        err => {
          console.log(err);
        }
      );
    } else {
      this.searchChannelPanelDetails.infoMsg = 'Please enter the channel name';
    }
  }

  joinChannel(channel: any, callback?: any) {
    this._chatService.joinChannel(channel.sid).subscribe(
      response => {
        this.channelList.unshift(channel);
        if (callback) {
          callback();
        }
      },
      err => {}
    );
  }

  sendMessage() {
    if (this.selectedChannel && this.selectedChannel.sid && this.message) {
      this._chatService
        .sendMessage(this.message, this.selectedChannel.sid)
        .subscribe(
          res => {
            this.message = null;
            this.getAllMessages(this.selectedChannel.sid);
          },
          err => {
            console.log(err);
          }
        );
    }
  }

  getAllMessages(channelId: string) {
    if (channelId) {
      this._chatService.getAllMessages(channelId).subscribe(
        res => {
          this.messageSet = res.messages.reverse();
          for (const message of this.messageSet) {
            if (message.from === this._chatService.identity) {
              message.userName = 'Me';
            } else {
              message.userName = message.from.split('@')[0];
            }
          }
          this.chatScrollToBottom();
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  back() {
    this.router.navigate(['/loginchat']);
  }

  onChannelSelectionFromSearchPanel(channel: any) {
    this.closeSearchChannelPanel();
    for (const item of this.channelList) {
      if (item.sid === channel.sid) {
        this.reloadChatBox(channel);
        return;
      }
    }
    this.joinChannelDetails = {
      channel: channel,
      show: true
    };
  }

  onChannelSelection(channel: any) {
    this.reloadChatBox(channel);
  }

  reloadChatBox(channel: any) {
    this.selectedChannel = channel;
    this.messageSet = [];
    this.getAllMessages(channel.sid);
  }

  onJoinChannel() {
    if (this.joinChannelDetails && this.joinChannelDetails.channel) {
      this.joinChannel(this.joinChannelDetails.channel, () => {
        this.reloadChatBox(this.joinChannelDetails.channel);
        this.onCancelJoinChannel();
      });
    }
  }

  onCancelJoinChannel() {
    this.joinChannelDetails = null;
  }

  closeSearchChannelPanel() {
    this.searchChannelPanelDetails.show = false;
  }

  chatScrollToBottom() {
    setTimeout(() => {
      const objDiv = document.getElementById('chatMessageList');
      objDiv.scrollTop = objDiv.scrollHeight;
    });
  }
}
