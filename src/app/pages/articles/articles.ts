import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { Article } from '../../entities/Article';
import { ArticleService } from '../../services/article-service';
import { LoaderService } from '../../services/loader';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service';

@Component({
  selector: 'app-articles',
  standalone: false,
  templateUrl: './articles.html',
  styleUrl: './articles.css',
})
export class Articles {
  articles: Article[] = [];
  article: Article = {} as Article;
  totalPages : number = 0;
  currentPage: number = 0;
  activeScreen : String = ''

  constructor(
  private service: ArticleService,
  public loaderService: LoaderService, 
  private zone: NgZone, 
  private cdr: ChangeDetectorRef,
  private router: Router,
  private authService: AuthService
){}

ngOnInit(): void {
  if(this.articles.length == 0){
    console.log('Carregando artigos...');
    this.loadArticles();
  }
}

findArticleById(id: number): Article {
  this.service.getArticleById(id).subscribe({
    next: (response: any) => {
      this.zone.run(() => {
       this.article = response;
       this.cdr.detectChanges(); 
       return response;
      });
    },
    error: (err) => {
      console.error('Erro ao buscar artigo por ID:', err);
      alert('Erro ao buscar artigo por ID: ' + (err?.error?.message || err.message || err));
      return {} as Article;
    }
  });
  return {} as Article; // Retorna um objeto vazio enquanto aguarda a resposta da API
  }



loadArticles() {
  this.service.getArticles(this.article,this.currentPage,12)
    .subscribe({
      next: (response: any) => {
        console.log('Resposta completa da API:', response);
        console.log('Tipo de response:', typeof response);
        console.log('É array?', Array.isArray(response));
        this.zone.run(() => {
          this.articles = Array.isArray(response) ? response : response.content || [];
          this.totalPages = response.totalPages;
          this.cdr.detectChanges();
        });
        console.log('Livros carregados:', this.articles);
      },
      error: (err) => {
        console.error('Erro ao carregar artigos:', err);
        this.articles = [];
      },
      complete: () => {
        
      }
    });

  }


selectedImage: string | null = null;

openImage(img: string) {
  this.selectedImage = img;
}

filterChange(){
  this.currentPage = 0;
  this.loadArticles();
}
closeImage() {
  this.selectedImage = null;
}

    deleteArticle(article: Article): void {
      if (confirm(`Tem certeza que deseja deletar o artigo "${article.name}"?`)) {
        this.loaderService.show();
        this.service.deleteArticle(article.id).subscribe({
          next: () => {
            this.articles = this.articles.filter(b => b.id !== article.id);
            this.cdr.detectChanges();
          },
          error: (err) => {
            alert('Erro ao deletar artigo: ' + (err?.error?.message || err.message || err));
          },
          complete: () => {
            this.loaderService.hide();
            this.loadArticles(); // Recarrega a lista de artigos após a exclusão

          }
        });
      }
    }


isUnavailable(article: Article): boolean {
  return article.stockQuantity === 0;
}

updateArticle(article: Article): void {
  article.flUpdate = true;
  this.router.navigate(['/article-register', article.id],{
    state: {article: article}
  });
}

viewDetails(article: Article ): void {
   this.router.navigate(['/article-details', article.id], {
    state: { article: article }
  });
}

nextPage(){
  if(this.currentPage <= this.totalPages -1){
    this.currentPage++;
    this.loadArticles();
  }

  
}
  
isAdmin(): boolean{
    return this.authService.isAdmin();
}

backPage(){
   if(this.currentPage > 0){
    this.currentPage--;
    this.loadArticles();
  } 
  }
}
