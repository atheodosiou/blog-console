import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NewPostComponent } from './components/new-post/new-post.component';

const appComponents = [
    NavBarComponent,
    NewPostComponent,
    DashboardComponent
];

@NgModule({
    declarations: [...appComponents],
    imports: [
        CommonModule
    ],
    exports: [...appComponents]
})
export class SharedModule { }
