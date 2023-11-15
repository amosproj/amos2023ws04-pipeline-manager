import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HeaderComponent } from './components/header/header.component';
import { LandingComponent } from './components/landing/landing.component';
import { UserComponent } from './components/user/user.component';
import { UploadFileComponent } from './components/uploadFile/upload-file/upload-file.component';
import { AlertModule } from '@full-fledged/alerts';
// import { SideBarComponent } from './components/side-bar/side-bar.component';
// import { ProjectComponent } from './components/project/project.component';
// import { PiplineComponent } from './components/pipline/pipline.component';
// import { DownloadComponent } from './components/download/download.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    LandingComponent,
    UserComponent,
    UploadFileComponent,
    // SideBarComponent,
    // ProjectComponent,
    // PiplineComponent,
    // DownloadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AlertModule.forRoot({ maxMessages: 5, timeout: 5000 }),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
