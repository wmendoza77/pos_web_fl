import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Dialog, DialogModule } from 'primeng/dialog';
import { FluidModule } from 'primeng/fluid';
import { IconFieldModule } from 'primeng/iconfield';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputIconModule } from 'primeng/inputicon';
import { InputMaskModule } from 'primeng/inputmask';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { KeyFilterModule } from 'primeng/keyfilter';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TextareaModule } from 'primeng/textarea';
import { CLIENT_PARAMS, CLIENT_RESULT, LineaVenta } from '../interfaces/pos';
import { DateFormatPipe } from '../pipes/date-format.pipe';
import { ClientService } from '../service/soap/client.service';
import { UtilesService } from '../service/soap/utiles.service';

@Component({
    selector: 'app-pos',
    imports: [
        CommonModule,
        DialogModule,
        TableModule,
        TagModule,
        InputNumberModule,
        InputGroupModule,
        InputGroupAddonModule,
        IconFieldModule,
        InputIconModule,
        MenuModule,
        ButtonModule,
        MenubarModule,
        InputTextModule,
        FluidModule,
        FormsModule,
        TextareaModule,
        KeyFilterModule,
        InputMaskModule,
        DateFormatPipe
    ],
    templateUrl: './pos.html',
    styleUrl: './pos.scss'
})
export class Pos implements OnInit {
    @ViewChild('modalArticulo') modalArticulo!: Dialog;

    nestedMenuItems = [
        {
            label: 'Nuevo (F3)',
            icon: 'pi pi-fw pi-file'
        },
        {
            label: 'Traer oferta (F2)',
            icon: 'pi pi-fw pi-history'
        },
        {
            label: 'Cotizar (F9)',
            icon: 'pi pi-fw pi-save'
        },
        {
            label: 'Facturar (F10)',
            icon: 'pi pi-fw pi-dollar'
        },
        {
            label: 'Buscar Art. (F7)',
            icon: 'pi pi-fw pi-shopping-cart',
            command: () => {
                this.mostrarBusquedaArticulo(this.modalArticulo);
            }
        }
    ];
    hoy = new Date();
    loading: boolean = false;
    // display: boolean = false;
    // @ViewChild('filter') filter!: ElementRef;
    posiciones: LineaVenta[] = [];
    posicion: LineaVenta = {};
    load = {
        buscarCliente: false,
        buscarArticulo: false
    };
    mostrarDialog = {
        cliente: false,
        articulo: false,
        nuevoCliente: false
    };
    clientes: CLIENT_RESULT[] = [];
    clienteBusqueda: CLIENT_PARAMS = { codigo: '', nit: '', nombre: '' };
    nombreCliente: string = '';
    clienteSeleccionado: CLIENT_RESULT = {
        KUNNR: '', // Inicializado como cadena vacía
        STCD1: '', // Inicializado como cadena vacía
        NAME: '' // Inicializado como cadena vacía
    };

    constructor(
        private clienteService: ClientService,
        public utiles: UtilesService
    ) {}
    ngOnInit(): void {}
    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    clear(table: Table) {
        table.clear();
        // this.filter.nativeElement.value = '';
    }

    close() {}

    mostrarBusquedaArticulo(dialog: Dialog) {
        console.log('🚀 ~ Pos ~ mostrarBusquedaArticulo ~ dialog:', dialog);
        this.mostrarDialog.articulo = true;
        dialog.maximized = true;
    }
    buscarClientes() {
        this.load.buscarCliente = true;
        this.clienteService.buscarCliente(this.clienteBusqueda).subscribe({
            next: (clientes) => {
                if (Array.isArray(clientes)) {
                    this.clientes = clientes;
                    // console.log('Clientes encontrados:', this.clientes);
                } else {
                    alert('La respuesta del servidor no es válida.');
                }
                this.load.buscarCliente = false;
            },
            error: (error) => {
                this.load.buscarCliente = false;
                alert(`Error al buscar clientes: ${error.message}`);
                console.error('Error al buscar clientes:', error);
            }
        });
    }

    seleccionarCliente(cliente: CLIENT_RESULT) {
        // this.clienteSeleccionado = `${+cliente.KUNNR} - ${cliente.STCD1} - ${cliente.NAME}`;
        this.clienteSeleccionado = cliente;
        const kunnr = this.clienteSeleccionado.KUNNR || 'Sin KUNNR';
        const stcd1 = this.clienteSeleccionado.STCD1 || 'Sin STCD1';
        const name = this.clienteSeleccionado.NAME || 'Sin Nombre';
        this.nombreCliente = `${+kunnr} - ${stcd1} - ${name}`;
        this.mostrarDialog.cliente = false;
    }

    agregarCliente() {}
}
