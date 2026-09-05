import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from '../entities/Article';

@Injectable({
  providedIn: 'root',
})
export class ArticleService {
  constructor(private http: HttpClient){}
  apiUrl = 'http://localhost:8080/';

  getArticles(filter: Article, currentPage:number, size:number){
    return this.http.get<any>(`${this.apiUrl}articles?name=${filter.name||''}&page=${currentPage}&size=${size}`);
  }

  updateArticle(article: Article){ 
  return this.http.put(`${this.apiUrl}articles/${article.id}`, article, {observe: 'response'});
}
  getArticleById(id: number){
    return this.http.get<Article>(`${this.apiUrl}articles/${id}`)
  }

  saveArticle(article: Article){
    return this.http.post<Article>(`${this.apiUrl}articles`,article,{observe : 'response'});
  }

  deleteArticle(id: number){
    return this.http.delete(`${this.apiUrl}articles/${id}`, {observe: 'response'});
  }

  getImgUrl(imgFormFile : FormData){
    return this.http.post(this.apiUrl+"images/upload",imgFormFile, {observe: 'response'});
  }
}
