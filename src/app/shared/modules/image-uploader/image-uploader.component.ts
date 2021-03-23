import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss']
})
export class ImageUploaderComponent implements OnInit {

  selectedFile: File = null;
  url: string = null;

  constructor(private http: HttpClient) { }

  ngOnInit() { }

  selectFile(event: any) {
    if (event?.target.files?.length > 0) {
      this.selectedFile = event?.target.files[0];
      console.log(this.selectedFile);
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
      formData.append('image', this.selectedFile, this.selectedFile.name);
      // this.http.post('', formData, { observe: 'events', reportProgress: true }).subscribe(event => {
      //   if (event.type === HttpEventType.UploadProgress) {
      //     console.log(`Upload Progress: ${Math.round(event.loaded / event.total * 100)}%`);
      //   } else if (event.type === HttpEventType.Response) {
      //     console.log(event);
      //   }
      // }, error => {
      //   console.log(error);
      // });
    }
  }
}
