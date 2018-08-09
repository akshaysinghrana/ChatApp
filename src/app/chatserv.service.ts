import { Injectable } from '@angular/core';
import { Observable } from '../../node_modules/rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { MapOperator } from '../../node_modules/rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class ChatservService {

  serviceId: string = "IS5073caf0f5444cf498f6f846a417f6cd";
  chennalList: any;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic QUM0OTY1Y2FkNWZiOTQxYTc3ODU5ZWRmN2I4NTQwNGZmNTo2ZjQxOTZkYWQyZDVhMjM0OGY0ZjI0MTNiMmRmMTQxNg== '
    })
  };
  UserName: string = 'AC4965cad5fb941a77859edf7b85404ff5'
  Password: string = '6f4196dad2d5a2348f4f2413b2df1416'

  constructor(private httpClient: HttpClient) { }
  setJson(): Observable<any> {
    return this.httpClient.post("https://chat.twilio.com/v2/Services", "FriendlyName=usercred", this.httpOptions);
  }


  addChannel(newChennal):Observable<any>{
    
    return this.httpClient.post("https://chat.twilio.com/v2/Services/"+this.serviceId+"/Channels","FriendlyName=usercreed&UniqueName="+newChennal,this.httpOptions);
}

searchChannel():Observable<any>{
  
  return  this.httpClient.get("https://chat.twilio.com/v2/Services/"+this.serviceId+"/Channels",this.httpOptions).pipe(map(data=>data)); 
}
myChannelId:string="CHcee605ea73d342fca51a585b7292e834";
// identity:string="akshay.singh@kelltontech.com";
identity:string="akshayrana707@gmail.com";
joinChannel(channelId):Observable<any>{
  // this.myChannelId=channelId;
  return this.httpClient.post("https://chat.twilio.com/v2/Services/"+this.serviceId+"/Channels/"+channelId+"/Members","ChannelSid="+channelId+"&Identity="+this.identity+"&ServiceSid="+this.serviceId,this.httpOptions); 
}

sendMessage(myMessage):Observable<any>{
  return this.httpClient.post("https://chat.twilio.com/v2/Services/"+this.serviceId+"/Channels/"+this.myChannelId+"/Messages","ChannelSid="+this.myChannelId+"&ServiceSid="+this.serviceId+"&Body="+myMessage+"&From="+this.identity,this.httpOptions); 
}

getAllMessages():Observable<any>{
  return this.httpClient.get("https://chat.twilio.com/v2/Services/"+this.serviceId+"/Channels/"+this.myChannelId+"/Messages",this.httpOptions).pipe(map(data=>data));
}
// joinChannel():Observable<any>{
//   return this.httpClient.
// }
}

