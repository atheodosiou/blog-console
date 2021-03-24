import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toKb'
})
export class ToKbPipe implements PipeTransform {

  transform(value: number): string {
    return `${(value / 1024).toFixed(2)} Kb`;
  }

}
