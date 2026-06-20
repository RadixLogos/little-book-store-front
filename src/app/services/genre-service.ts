import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GenreService {

 private apiUrl = 'http://localhost:8080/'

  constructor(private http: HttpClient){}

  getAllGenres(){
   return this.http.get<any>(`${this.apiUrl}genres`, { observe: 'response' });
  }

}

