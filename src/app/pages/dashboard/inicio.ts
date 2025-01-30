import { Component } from '@angular/core';
import { TotalesWidget } from './components/totaleswidget';

@Component({
    selector: 'app-inicio',
    imports: [TotalesWidget],
    template: `
        <div class="grid grid-cols-12 gap-8">
            <app-totales-widget class="contents" />
            <div class="col-span-12 xl:col-span-6"></div>
        </div>
    `
})
export class Inicio {}
