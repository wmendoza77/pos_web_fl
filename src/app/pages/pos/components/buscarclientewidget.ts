import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
    standalone: true,
    selector: 'app-buscar-cliente',
    imports: [CommonModule, ButtonModule],
    template: ` <div class="card"></div>`
})
export class BuscarClienteWidget {}
