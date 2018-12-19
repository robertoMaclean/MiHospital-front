import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class Validate {

  constructor(
    private http: HttpClient
  ) {}

  ValidateRUT(rut: string) {
    if(rut=='') rut='-1';
    return true;
  }

}



