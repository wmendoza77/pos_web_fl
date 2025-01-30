// soap-operations.service.ts
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UtilesService {
    constructor() {}

    allowOnlyNumbers(event: KeyboardEvent): void {
        const charCode = event.which ? event.which : event.keyCode;
        // Permitir solo dígitos (0-9)
        if (charCode < 48 || charCode > 57) {
            event.preventDefault();
        }
    }

    getFormattedDate(format: string): string {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0'); // Día con 2 dígitos
        const month = String(today.getMonth() + 1).padStart(2, '0'); // Mes con 2 dígitos
        const year = today.getFullYear(); // Año completo

        return format.replace('dd', day).replace('MM', month).replace('YYYY', String(year));
    }
}
