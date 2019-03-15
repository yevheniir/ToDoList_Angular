import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], list: any): any[] {
    if (!items) { return []; }

    if (!list) { return items; }

    let filteredItems: any = items.filter( it => {
      return it.listId === list.id && it.complete === false;
    });

    if (filteredItems.length > 5) {
      filteredItems = filteredItems.slice(0, 4);
      filteredItems.push({text: '...'});
    }

    return filteredItems;
   }
}
