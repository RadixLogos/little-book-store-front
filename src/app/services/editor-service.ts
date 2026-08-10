import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Editor } from '../entities/editor';

@Injectable({
  providedIn: 'root',
})
export class EditorService {

 private apiUrl = 'http://localhost:8080/'

  constructor(private http: HttpClient){}

  getAllEditors(){
   return this.http.get<any>(`${this.apiUrl}editor`, { observe: 'response' });
  }
  
  insertEditor(editor: Editor){
    return this.http.post<any>(`${this.apiUrl}editor`,editor,{observe: 'response'});
  }

  updateEditor(editor: Editor){
    return this.http.put<any>(`${this.apiUrl}editor/${editor.id}`,editor,{observe: 'response'});
  }
}

