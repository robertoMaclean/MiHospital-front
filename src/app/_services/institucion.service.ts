import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Institucion } from '../_models'


@Injectable()
export class InstitucionService {
    URL = '/retiro_medicamento/';
    constructor(private http: HttpClient) {

    }

    getInstituciones() {
        return this.http.get<Institucion[]>(this.URL +'instituciones');
    }  
}