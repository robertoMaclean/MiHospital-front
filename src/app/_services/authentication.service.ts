import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {
    URL = '/retiro_medicamento/login';
    constructor(private http: HttpClient) {}
    
    login(username: string, password: string) {
       
        let headers: HttpHeaders = new HttpHeaders();
        headers = headers.append('Content-Type', 'application/json');

        return this.http.post<any>(this.URL, { "username": username, "password": password }, { headers: headers })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response

                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            }))     
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}