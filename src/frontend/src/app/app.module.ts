import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './modules/header/header.component';
import { LandingComponent } from './pages/landing/landing.component';
import { SideBarComponent } from './modules/side-bar/side-bar.component';
import { DataTablesModule } from "angular-datatables";
import {DatapipelineModule} from "./pages/datapipeline/datapipeline.module";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListS3bucketfilesComponent } from './pages/s3bucketfiles/list-s3bucketfiles/list-s3bucketfiles.component';
import { FormsModule } from '@angular/forms';
import { S3UploadFilesComponent } from './pages/s3-upload-files/s3-upload-files.component';
import { StartDataPipelineComponent } from './pages/start-data-pipeline/start-data-pipeline.component';
import {DatapipelineRunModule} from "./pages/datapipeline-run/datapipeline-run.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingComponent,
    SideBarComponent,
    ListS3bucketfilesComponent,
    S3UploadFilesComponent,
    StartDataPipelineComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DataTablesModule,
    DatapipelineModule,
    DatapipelineRunModule,
    NgbModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
