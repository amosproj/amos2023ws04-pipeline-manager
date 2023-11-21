import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LandingComponent } from './components/landing/landing.component';
import { UserComponent } from './components/user/user.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { DownloadComponent } from './components/download/download.component';
import { PipelineComponent } from './components/pipeline/pipeline.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: LandingComponent },
  { path: 'user', component: UserComponent },
  { path: 'upload', component: UploadFileComponent },
  { path: 'download', component: DownloadComponent },
  { path:'pipeline',component:PipelineComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
