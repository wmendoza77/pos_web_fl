import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { MessageModule } from 'primeng/message';
import { PasswordModule } from 'primeng/password';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';
import { SoapOperationsService } from '../service/soap/soap.service';

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [CommonModule, ProgressSpinnerModule, ToastModule, ButtonModule, CheckboxModule, InputTextModule, PasswordModule, MessageModule, FormsModule, RouterModule, RippleModule, AppFloatingConfigurator],
    template: `
        <app-floating-configurator />
        <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
            <div class="flex flex-col items-center justify-center">
                <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                    <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
                        <div class="text-center mb-8">
                            <img src="assets/images/logo.png" [ngStyle]="myStyles" />
                            <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Bienvenido a Pos Web!</div>
                            <span class="text-muted-color font-medium">Inicie sesion para continuar</span>
                        </div>
                        <div>
                            <form #loginForm="ngForm" novalidate>
                                <!-- Username Input -->
                                <label for="username" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Usuario SAP</label>
                                <input pInputText id="username" type="text" placeholder="Usuario" class="w-full md:w-[30rem] mb-2" [(ngModel)]="username" name="username" required #usernameInput="ngModel" />
                                <!-- <p-message *ngIf="usernameInput.invalid && usernameInput.touched" severity="error" variant="simple" size="small"> El campo Usuario es obligatorio </p-message> -->

                                <!-- Password Input -->
                                <label for="password1" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">contraseña</label>
                                <p-password id="password1" [(ngModel)]="password" name="password" placeholder="Password" [toggleMask]="true" styleClass="mb-2" [fluid]="true" [feedback]="false" required #passwordInput="ngModel"> </p-password>
                                <!-- <p-message *ngIf="passwordInput.invalid && passwordInput.touched" severity="error" variant="simple" size="small"> El campo Password es obligatorio </p-message> -->

                                <!-- Submit Button -->
                                <p-button label="Iniciar Sesion" styleClass="w-full" (onClick)="login()" [disabled]="loginForm.invalid"> </p-button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <p-toast></p-toast>
        <div class="loading-overlay" *ngIf="loading">
            <p-progressSpinner></p-progressSpinner>
        </div>
    `,
    providers: [MessageService]
})
export class Login {
    checked: boolean = false;
    myStyles = {
        display: 'unset',
        width: '120px',
        height: '120px'
    };
    username = 'wmendoza';
    password = 'Card1312++';
    errorMessage = '';
    loading: boolean = false;

    constructor(
        private soapService: SoapOperationsService,
        private router: Router,
        private service: MessageService
    ) {}
    login() {
        if (!this.username || !this.password) {
            this.errorMessage = 'Por favor, ingrese usuario y contraseña';
            return;
        }

        this.soapService.setCredentials(this.username.trim(), this.password.trim());
        this.soapService.callSoapFunction('Login', {}).subscribe({
            next: (response) => {
                console.log('🚀 ~ Login ~ this.soapService.callSoapFunction ~ response:', response);
                try {
                    this.loading = true;
                    const parsedResponse = JSON.parse(response);
                    if (parsedResponse.TIPO === 'OK') {
                        const resp = JSON.parse(parsedResponse.MSG);
                        // console.log('Cliente Result:', resp);
                        this.soapService.setCredentials(this.username, this.password);
                        // Redirigir al componente principal o de inicio después del login.
                        this.router.navigate(['/pos']);
                        this.loading = false;
                    } else {
                        this.soapService.clearCredentials();
                        this.service.add({ severity: 'error', summary: 'POS Web FL', detail: 'Nombre de usuario y/o constraseña incorrecta.' });
                        this.loading = false;
                        console.error('Error en respuesta del servidor:', parsedResponse.MSG);
                    }
                } catch (error) {
                    this.loading = false;

                    console.error('Error parsing response:', error);
                }
            },
            error: (error) => {
                this.loading = false;

                console.error('Error buscando material:', error);
            }
        });
    }
}
