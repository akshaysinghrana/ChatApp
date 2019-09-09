import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  apiUrl = 'https://chat.twilio.com/v2/Services';
  serviceId: string = 'IS5073caf0f5444cf498f6f846a417f6cd';
  chennalList: any;
  myChannelId: string = 'CHcee605ea73d342fca51a585b7292e834';
  // identity:string="akshay.singh@kelltontech.com";
  identity: String = localStorage.getItem('Identity');
  identityName: String = localStorage.getItem('IdentityName');

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Basic QUM0OTY1Y2FkNWZiOTQxYTc3ODU5ZWRmN2I4NTQwNGZmNTo2ZjQxOTZkYWQyZDVhMjM0OGY0ZjI0MTNiMmRmMTQxNg== '
    })
  };
  UserName: string = 'AC4965cad5fb941a77859edf7b85404ff5';
  Password: string = '6f4196dad2d5a2348f4f2413b2df1416';

  constructor(private httpClient: HttpClient) {}

  setJson(): Observable<any> {
    return this.httpClient.post(
      this.apiUrl,
      'FriendlyName=usercred',
      this.httpOptions
    );
  }

  addChannel(newChennal): Observable<any> {
    return this.httpClient.post(
      `${this.apiUrl}/` + this.serviceId + '/Channels',
      'FriendlyName=usercreed&UniqueName=' + newChennal,
      this.httpOptions
    );
  }

  joinChannel(channelId): Observable<any> {
    return this.httpClient.post(
      `${this.apiUrl}/` +
        this.serviceId +
        '/Channels/' +
        channelId +
        '/Members',
      'ChannelSid=' +
        channelId +
        '&Identity=' +
        this.identity +
        '&ServiceSid=' +
        this.serviceId,
      this.httpOptions
    );
  }

  sendMessage(message, channelId): Observable<any> {
    return this.httpClient.post(
      `${this.apiUrl}/` +
        this.serviceId +
        '/Channels/' +
        channelId +
        '/Messages',
      'ChannelSid=' +
        channelId +
        '&ServiceSid=' +
        this.serviceId +
        '&Body=' +
        message +
        '&From=' +
        this.identity,
      this.httpOptions
    );
  }

  getAllMessages(channelId: string): Observable<any> {
    return this.httpClient
      .get(
        `${this.apiUrl}/` +
          this.serviceId +
          '/Channels/' +
          channelId +
          '/Messages?PageSize=50&Page=0&Order=desc',
        this.httpOptions
      )
      .pipe(map(data => data));
  }

  getAllChannels(): Observable<any> {
    return this.httpClient
      .get(`${this.apiUrl}/${this.serviceId}/Channels`, this.httpOptions)
      .pipe(map(data => data));
  }

  getAllMembersOfChannel(channelSID: string): Observable<any> {
    return this.httpClient
      .get(
        `${this.apiUrl}/${this.serviceId}/Channels/${channelSID}/Members`,
        this.httpOptions
      )
      .pipe(map(data => data));
  }
}
