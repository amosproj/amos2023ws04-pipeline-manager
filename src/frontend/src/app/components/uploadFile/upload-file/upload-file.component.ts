import { Component } from '@angular/core';
import { log } from 'console';
import { UploadFileService } from 'src/app/services/UploadFile/upload-file.service';
import { RestApiService } from 'src/app/services/restApi/rest-api.service';
import { deprecate } from 'util';


@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss']
})
export class UploadFileComponent {

  constructor(private uploadService: UploadFileService, private restapi: RestApiService) {
  }

  // ! not used anymore

  /* selectedFile: File | null = null;
  onFileSelected(event: any): void {
    this.uploadService.onFileSelected(event)
  }

  uploadFile(): void {
   this.uploadService.uploadFile()
  }
  showNotification() {
    alert("done")
  } */

  selectedFile: File | null = null;
  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0] as File;
    console.log("filepath",event.target.value)
    console.log(this.selectedFile)
    // check condition

  }


  getallEndpoint() {
    console.log("getting all pipeline")
    this.restapi.getAllDataPipelines().then((data) => {
      console.log("all pipeline ", data)
    }, (error) => {
      console.error("creating pipeline",error)
    })
  }

  getDataPipelineId(id:string) {
    console.log("getting pipeline with id")
    this.restapi.getAllDataPipelines(id).then((data) => {
      console.log(" pipeline with id", data)
    }, (error) => {
      console.error("creating pipeline",error)
    })
  }

  createDatapipeline() {
    console.log("creating pipeline")
    this.restapi.createDataPipeline("newPipeline","trying new pipleine ").then((data) => {
      console.log("create pipeline ", data)
    }, (error) => {
      console.error("creating pipeline",error)
    })
  }

  uploadBackendCSV() {
    this.restapi.uploadCSV(this.selectedFile).then((data) => {
      console.log("upload succesful")
    }, (error) => {
      console.error("creating pipeline",error)
    })
  
  }

  

}
