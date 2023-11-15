import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { LandingComponent } from './components/landing/landing.component';
import { UserComponent } from './components/user/user.component';
import { UploadFileComponent } from './components/uploadFile/upload-file/upload-file.component';
// import { ProjectComponent } from './components/project/project.component';
// import { PiplineComponent } from './components/pipline/pipline.component';
// import { DownloadComponent } from './components/download/download.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '', component: LandingComponent },
  { path: 'user', component: UserComponent },
  { path: 'upload', component: UploadFileComponent },
  // { path: 'project', component: ProjectComponent },
  // { path: 'pipline', component: PiplineComponent },
  // { path: 'download', component: DownloadComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
