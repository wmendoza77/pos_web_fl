// soap-operations.service.ts
import { Injectable } from '@angular/core';
import { CLIENT_PARAMS, CLIENT_RESULT } from '../../interfaces/pos';
import { SoapOperationsService } from './soap.service';
import { map, catchError, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ClientService {
    clientes: CLIENT_RESULT[] = [];

    constructor(private soap: SoapOperationsService) {}

    buscarCliente(dataSearch: CLIENT_PARAMS) {
        const params = {
            gv_kunnr: dataSearch.codigo,
            gv_stcd1: dataSearch.nit,
            gv_name1: dataSearch.nombre,
            gv_vkorg: '1000',
            gv_vtweg: '10',
            gv_spart: '00'
        };
      return this.soap.callSoapFunction('BuscarCliente', params).pipe(
          map((response) => {
              try {
                  this.clientes = JSON.parse(response);
                  if (Array.isArray(this.clientes)) {
                      return this.clientes; // Emitir los clientes parseados
                  } else {
                      throw new Error('El formato de la respuesta no es válido.');
                  }
              } catch (error) {
                  throw new Error('Error al parsear la respuesta del servidor.');
              }
          }),
          catchError((error) => {
              console.error('Error buscando cliente:', error);
              return throwError(() => new Error(error.message || 'Error desconocido.'));
          })
      );
    }
}
