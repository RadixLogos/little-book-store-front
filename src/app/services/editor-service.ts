import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EditorService {

 private apiUrl = 'http://localhost:8080/'

  constructor(private http: HttpClient){}

  getAllEditors(){
   return this.http.get<any>(`${this.apiUrl}editor`, { observe: 'response' });
  }

}

