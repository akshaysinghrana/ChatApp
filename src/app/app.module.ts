import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ChatloginComponent } from './chatlogin/chatlogin.component';
import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider
} from 'angular-6-social-login';
import { ChatmeComponent } from './chatme/chatme.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { NotfoundComponent } from './notfound/notfound.component';
import { ChannelListComponent } from './components/channel-list/channel-list.component';
import { AddChannelComponent } from './components/add-channel/add-channel.component';
import { AuthGuard } from './guards/auth.guard';

const route: Routes = [
  {
    path: 'mechat',
    component: ChatmeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: ChatloginComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: ''
  },
  {
    path: '**',
    component: NotfoundComponent
  }
];

export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig([
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider(
        '172104126983-47v4rs9ln893e7bdugtoogorpdl489g3.apps.googleusercontent.com'
      )
    }
  ]);
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    ChatloginComponent,
    ChatmeComponent,
    ClickOutsideDirective,
    NotfoundComponent,
    ChannelListComponent,
    AddChannelComponent
  ],
  imports: [
    BrowserModule,
    SocialLoginModule,
    RouterModule.forRoot(route),
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
