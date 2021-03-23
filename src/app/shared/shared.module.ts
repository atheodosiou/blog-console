import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NewPostComponent } from './components/new-post/new-post.component';
//NgbModules
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditorComponent } from './components/editor/editor.component';
import { ImageUploaderModule } from './modules/image-uploader/image-uploader.module';
const appComponents = [
    NavBarComponent,
    NewPostComponent,
    DashboardComponent,
    EditorComponent
];

@NgModule({
    declarations: [...appComponents],
    imports: [
        CommonModule,
        NgbModule,
        ImageUploaderModule
    ],
    exports: [...appComponents, NgbModule]
})
export class SharedModule { }
