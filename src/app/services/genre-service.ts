import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Genre } from '../entities/Genre';

@Injectable({
  providedIn: 'root',
})
export class GenreService {

 private apiUrl = 'http://localhost:8080/'

  constructor(private http: HttpClient){}

  getAllGenres(){
   return this.http.get<any>(`${this.apiUrl}genres?sort=name,asc`, { observe: 'response' });
  }

  getGenre(genre: Genre){
   return this.http.get<any>(`${this.apiUrl}genres/${genre.id}`, { observe: 'response' });
  }

  insertGenre(genre: Genre){
    return this.http.post<any>(`${this.apiUrl}genres`,genre,{observe: 'response'});
  }


  updateGenre(genre: Genre){
    return this.http.put<any>(`${this.apiUrl}genres/${genre.id}`,genre,{observe: 'response'});
  }

  deleteGenre(genre : Genre){
    return this.http.delete<any>(`${this.apiUrl}genres/${genre.id}`);
  }
}

