import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import { UploadService } from '../../services/upload.service';

@Component({
  selector: 'image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss']
})
export class ImageUploaderComponent implements OnInit {

  selectedFile: File = null;
  url: string = null;
  imageName: string;
  imageDescription: string;
  progress: number = 0;
  uploading: boolean = false;
  fileExtentionRegex = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;

  constructor(private uploadservice: UploadService, private alertService: AlertService) { }

  ngOnInit() { }

  selectFile(event: any) {
    if (event?.target.files?.length > 0) {
      this.selectedFile = event?.target.files[0];
      this.imageName = event?.target?.files[0]?.name;
      const reader = new FileReader();
      reader.readAsDataURL(event?.target?.files[0]);
      reader.onload = (e: any) => {
        this.url = e?.target?.result;
      };
    }
  }

  clear() {
    this.url = null;
    this.selectedFile = null;
  }
  upload() {
    if (this.selectedFile) {
      const formData: FormData = new FormData();
      formData.append('image', this.selectedFile, this.imageName);
      console.log(this.selectedFile);
      this.uploading = true;
      this.uploadservice.uploadImage(formData).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(event.loaded * 100 / event.total);
        } else if (event.type === HttpEventType.Response) {
          console.log(event);
          this.uploading = false;
          this.alertService.success('Image uploaded.', '', 2000, true);
          this.url = null;
        }
      }, error => {
        console.log(error);
        this.uploading = false;
        this.alertService.error("Upload faild!", error, 3000, true);
      });
    }
  }
}
