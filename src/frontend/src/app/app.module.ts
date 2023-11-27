import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LandingComponent } from './components/landing/landing.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { DownloadComponent } from './components/download/download.component';
import { PipelineComponent } from './components/pipeline/pipeline.component';
import { DataTablesModule } from "angular-datatables";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingComponent,
    SideBarComponent,
    UploadFileComponent,
    DownloadComponent,
    PipelineComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientModule,
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
