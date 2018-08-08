import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ChatloginComponent } from './chatlogin/chatlogin.component';
import {SocialLoginModule,AuthServiceConfig,GoogleLoginProvider}from "angular-6-social-login";
import { ChatmeComponent } from './chatme/chatme.component';
import { RouterModule, Routes } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

const route: Routes = [
  { path: 'mechat',
   component: ChatmeComponent },
   {path: '',
    component: ChatloginComponent},
    {path: 'loginchat',
    component: ChatloginComponent},
    {path:"**",
  component:ChatloginComponent}
]

  export function getAuthServiceConfigs() {
    let config = new AuthServiceConfig(
        [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider("172104126983-47v4rs9ln893e7bdugtoogorpdl489g3.apps.googleusercontent.com")
          }
          ]
        );
    return config;
  }

@NgModule({
  declarations: [
    AppComponent,
    ChatloginComponent,
    ChatmeComponent
  ],
  imports: [
    BrowserModule,
    SocialLoginModule,
    RouterModule.forRoot(route),
    HttpClientModule
  ],
  providers: [{
    provide: AuthServiceConfig,
    useFactory: getAuthServiceConfigs
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
