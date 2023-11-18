import { Component } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {
  constructor() {
  }
  selectedFile: File | null = null;
  onFileSelected(event: any): void {
    // this.uploadFile.uploadFile(event)

    console.log("file upload clicked")
  }


}
