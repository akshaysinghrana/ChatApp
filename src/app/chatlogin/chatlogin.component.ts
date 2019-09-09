import { Component, OnInit } from '@angular/core';
import { AuthService, GoogleLoginProvider } from 'angular-6-social-login';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chatlogin',
  templateUrl: './chatlogin.component.html',
  styleUrls: ['./chatlogin.component.css']
})
export class ChatloginComponent implements OnInit {
  checkauthentication = false;
  constructor(
    private socialAuthService: AuthService,
    private _router: Router
  ) {}

  ngOnInit() {
    if (localStorage.getItem('Identity')) {
      this._router.navigate(['/mechat']);
    }
  }

  public socialSignIn(socialPlatform: string) {
    let socialPlatformProvider;
    if (socialPlatform === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    this.socialAuthService.signIn(socialPlatformProvider).then(userData => {
      this.checkauthentication = true;
      console.log(userData.name);
      localStorage.setItem('Identity', userData.email);
      localStorage.setItem('IdentityName', userData.name);
      this._router.navigate(['/mechat']);
    });
  }
}
