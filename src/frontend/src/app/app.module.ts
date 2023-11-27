import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './modules/header/header.component';
import { LandingComponent } from './pages/landing/landing.component';
import { UploadFileComponent } from './modules/upload-file/upload-file.component';
import { SideBarComponent } from './modules/side-bar/side-bar.component';
import { DownloadComponent } from './modules/download/download.component';
import { PipelineComponent } from './pages/pipeline/pipeline.component';
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
