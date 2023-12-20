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
import { DataTablesModule } from "angular-datatables";
import {DatapipelineModule} from "./pages/datapipeline/datapipeline.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { S3UploadFilesComponent } from './pages/s3-upload-files/s3-upload-files.component';
import { startDataPipelineComponent } from './pages/start-data-pipeline/start-data-pipeline.component';

import { ListS3bucketfilesComponent } from './pages/s3bucketfiles/list-s3bucketfiles/list-s3bucketfiles.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingComponent,
    SideBarComponent,
    UploadFileComponent,
    DownloadComponent,
    S3UploadFilesComponent,
    S3UploadFilesComponent,
    startDataPipelineComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientModule,
    DataTablesModule,
    DatapipelineModule,
    NgbModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
