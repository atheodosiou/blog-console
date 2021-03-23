import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ImageUploaderComponent } from "./image-uploader.component";

@NgModule({
    declarations: [ImageUploaderComponent],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [ImageUploaderComponent]
})
export class ImageUploaderModule { }