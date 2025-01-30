import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, tap } from 'rxjs';

import { environment } from '@env/environment';
// import { TokenService } from '@services/token.service';
import { User } from '@models/user.model';
import { TokenService } from '@services/token.service';
import { SoapOperationsService } from './soap/soap.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private http = inject(HttpClient);
    private tokenService = inject(TokenService);
    private soapService = inject(SoapOperationsService);
    private authState = new BehaviorSubject<User | null>(null);

    authState$ = this.authState.asObservable();

    // login1(email: string, password: string) {
    //     const url = `${environment.API_URL}/api/v1/auth/login`;
    //     return this.http.post<LoginRta>(url, { email, password }).pipe(
    //         tap((response) => this.tokenService.saveToken(response.access_token)),
    //         switchMap((_) => this.getProfile()),
    //         tap((user) => this.authState.next(user))
    //     );
    // }

    login(username: string, password: string) {
        this.soapService.setCredentials(username.trim(), password.trim());
        return this.soapService.callSoapFunction('Login', {}).pipe(
            tap((response) => {
                
            }),
            tap((user) => this.authState.next(user))
        );
    }

    setAuthState(user: User | null) {
        this.authState.next(user);
    }

    getProfile() {
        const url = `${environment.API_URL}/api/v1/auth/profile`;
        return this.http.get<User>(url);
    }

    logout() {
        this.tokenService.clearToken();
    }
}
