import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap'
import { ImageUploaderComponent } from "./image-uploader.component";
import { ToKbPipe } from './toKb.pipe';

@NgModule({
    declarations: [ImageUploaderComponent,
        ToKbPipe
    ],
    imports: [
        CommonModule,
        FormsModule,
        NgbProgressbarModule
    ],
    exports: [ImageUploaderComponent, ToKbPipe]
})
export class ImageUploaderModule { }