// soap-operations.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SoapOperationsService {
    private endpoint = 'http://srv-posweb:8080/qa/pos.asmx'; // Cambiar por la URL base de tu servicio SOAP
    private credentials: { user: string; pass: string } | null = null;

    constructor(private http: HttpClient) {}

    setCredentials(username: string, password: string): void {
        this.credentials = { user: username, pass: password };
    }

    clearCredentials(): void {
        this.credentials = null;
    }

    private createSoapRequest(operation: string, body1: string): string {
        let body = "<?xml version='1.0' encoding='utf-8'?>\n";
        body += '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ';
        body += 'xmlns:xsd="http://www.w3.org/2001/XMLSchema" ';
        body += 'xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">\n\t<soap:Body>\n';
        body += '\t\t<';
        body += operation;
        body += ' xmlns="http://localhost:8083/">\n';
        body += body1;
        body += '\t\t</';
        body += operation;
        body += '>\n\t</soap:Body>\n</soap:Envelope>';

        return body;
    }

    private sendSoapRequest(operation: string, params: Record<string, string | undefined>): Observable<string> {
        if (!this.credentials) {
            throw new Error('No credentials set. Please call setCredentials() before making requests.');
        }

        var completeParams = {};

        const otrosParams = {
            ...params,
            user: this.credentials.user,
            pass: this.credentials.pass
        };

        completeParams = otrosParams;

        if (operation === 'Login') {
            const loginParams = {
                ...params,
                username: this.credentials.user,
                password: this.credentials.pass
            };
            completeParams = loginParams;
        }

        console.log('🚀 ~ SoapOperationsService ~ sendSoapRequest ~ completeParams:', completeParams);
        const body = Object.entries(completeParams)
            .map(([key, value]) => (value !== undefined ? `<${key}>${value}</${key}>` : ''))
            .join('');
        console.log('🚀 ~ SoapOperationsService ~ sendSoapRequest ~ body:', body);

        const soapRequest = this.createSoapRequest(operation, body);
        const headers = new HttpHeaders({
            'Content-Type': 'text/xml; charset=utf-8'
            // SOAPAction: `${this.endpoint}${operation}`
        });

        return this.http.post(this.endpoint, soapRequest, { headers, responseType: 'text' });
    }

    // callSoapFunction(operation: string, params: Record<string, string | undefined>): Observable<string> {
    //     return this.sendSoapRequest(operation, params);
    // }
    callSoapFunction(operation: string, params: Record<string, string | undefined>): Observable<any> {
        return new Observable((observer) => {
            this.sendSoapRequest(operation, params).subscribe({
                next: (response) => {
                    try {
                        const parsedData = this.parseXMLWithDOMParser(response, operation);
                        observer.next(parsedData);
                        observer.complete();
                    } catch (error) {
                        observer.error(error);
                    }
                },
                error: (error) => observer.error(error)
            });
        });
    }

    private parseXMLWithDOMParser(xmlString: string, operation: string): any {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, 'text/xml');

        // Example: Extract specific data (update according to your XML structure)
        const resultNode = xmlDoc.getElementsByTagName(`${operation}Response`)[0];
        return resultNode ? resultNode.textContent : null;
    }
}
