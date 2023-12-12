import { Component } from '@angular/core';
import { BackendService } from 'src/app/core/services/lists3bucket/lists3bucket.service';


@Component({
  selector: 'app-start-data-pipeline',
  templateUrl: './start-data-pipeline.component.html',
  styleUrls: ['./start-data-pipeline.component.scss']
})

export class startDataPipelineComponent {
  s3Files: string[] = [];
  pipelines: any[] | undefined;
  selectedS3File: string | undefined;
  selectedPipeline: any | undefined;

  constructor(private backendService: BackendService) {}

  getS3Files() {
    this.backendService.getS3Files().subscribe(
      (response: { files: string[] }) => {
        console.log('API Response:', response);
        // ... rest of the code
        this.s3Files = response.files || [];
      },
      (error) => {
        console.error('Error fetching S3 files:', error);
      }
    );
  }



  getAvailablePipelines() {
    this.backendService.getAvailablePipelines().subscribe((pipelines) => {
      this.pipelines = pipelines;
    });
  }

  startPipeline() {
    if (this.selectedS3File && this.selectedPipeline) {
      const pipelineId = this.selectedPipeline.id; // Adjust this based on your data structure
      this.backendService.startPipeline(this.selectedS3File, pipelineId).subscribe(() => {
        console.log('Pipeline started successfully!');
      });
    }
  }
}
