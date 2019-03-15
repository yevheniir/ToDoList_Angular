import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'pin'
})
export class PinPipe implements PipeTransform {
  transform(items: any[]): any[] {
    if (!items) { return []; }

    const newItems = [];

    items = items.filter((item) => {
      if (item.pin === false) {
        newItems.push(item);
        return false;
      }
      return true;
    });

    return items.concat(newItems);
   }
}
