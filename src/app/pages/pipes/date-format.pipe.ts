import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {
    transform(value: Date | string | null, format: string = 'dd/MM/YYYY'): string {
        if (!value) {
            return '';
        }

        const date = typeof value === 'string' ? new Date(value) : value;

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return format.replace('dd', day).replace('MM', month).replace('YYYY', String(year));
    }
}
