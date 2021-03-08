import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

const appComponents = [
    NavBarComponent
];

@NgModule({
    declarations: [...appComponents],
    imports: [
        CommonModule
    ],
    exports: [...appComponents]
})
export class SharedModule { }
