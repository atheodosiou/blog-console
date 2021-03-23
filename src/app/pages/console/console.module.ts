import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsoleComponent } from './console.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      component: ConsoleComponent
    }]),
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [ConsoleComponent],
  exports: [ConsoleComponent]
})
export class ConsoleModule { }
