import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChatservService } from '../chatserv.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chatme',
  templateUrl: './chatme.component.html',
  styleUrls: ['./chatme.component.css']
})
export class ChatmeComponent implements OnInit {

  constructor(private router: Router, private chatser: ChatservService) { }
  Authenticate() {
    this.chatser.setJson().subscribe(response => {
      console.log(response)
    },
      err => {
        console.log(err);
      });
  }

  foundChannel = "";
  newChannel: string;
  addChannel() {
    console.log("new Channel NAme: " + this.newChannel);
    this.chatser.addChannel(this.newChannel).subscribe(res => {
      console.log("chennal created " + JSON.stringify(res.sid));
    },
      err => {
        console.log(err);
      });
    //  console.log("authenticated"+JSON.stringify(this.authService.setJson()));
  }

  channel: string = "";
  channelArray: any = [];
  arrayLen;
  fChannId = "";

  searchChannel() {
    this.chatser.searchChannel().subscribe(res => {
      console.log("RES value" + (res.channels[0].unique_name));
      console.log("len" + res.channels.length);
      for (let index = 0; index < res.channels.length; index++) {
        console.log("array " + (res.channels[index].sid));
        this.channelArray.push(res.channels[index].unique_name)
        console.log("channel array: " + this.channelArray);
        console.log("channel name: " + this.channel);
        this.arrayLen = this.channelArray.length;
        for (let index = 0; index < this.arrayLen; index++) {
          // console.log("in array: "+this.channelArray[index]+"    index  "+index);
          if (this.channelArray[index] == this.channel) {
            console.log("channel fopund");
            this.foundChannel = this.channel;
            this.fChannId = res.channels[index].sid;
            break;
          }
          else {
            console.log("not found");
            this.foundChannel = "plz enter valid channel name";
          }
        }
      }
    },
      err => {
        console.log();
      })
  }


  joinChannel() {
    console.log(this.fChannId);
    this.chatser.joinChannel(this.fChannId).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    })
  }

  myMessage: string;
  sendMessage() {
    this.chatser.sendMessage(this.myMessage).subscribe(res => {
      console.log(res);
    },
      err => {
        console.log(err);
      })
  }
  Messagesset = {};
  totalMessages: number;
  getAllMessages() {
    this.chatser.getAllMessages().subscribe(res => {
      this.Messagesset = res.messages;
        // console.log(res.messages.body);
     this.totalMessages= res.messages.length;
     console.log("total   "+this.totalMessages);
     for(let start=1;start<this.totalMessages;start++){
       
       console.log("msg ",start+" is    "+res.messages[start].body);
       this.Messagesset+=res.messages[start].body+"\n";
     }
      this.Messagesset=res.messages.body;
    },
      err => {
        console.log(err);
      })
  }


  back() {
    this.router.navigate(['/loginchat']);
  }

  ngOnInit() {
    this.getAllMessages();
  }

}
