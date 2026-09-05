import { ChangeDetectorRef, Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { ArticleService } from '../../services/article-service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../../entities/Article';

@Component({
  selector: 'app-article-register',
  standalone: false,
  templateUrl: './article-register.html',
  styleUrl: './article-register.css',
})
export class ArticleRegister {
  @ViewChild('fileInput') fileInput?: ElementRef<HTMLInputElement>;

  constructor(private articleService: ArticleService,
    private toast: ToastrService, private cdr: ChangeDetectorRef, private zone: NgZone, private router: Router, private route: ActivatedRoute){}
  articleSelected: Article = {} as Article;
  file!: File;
  imgUrl: string = '';
  ngOnInit(): void {
     // Tentar obter o artigo do state de navegação
    const articleFromState = window.history.state?.article;
    
    if (articleFromState) {
      this.articleSelected = articleFromState;
    } else {
      // Se não houver no state, tentar buscar pela rota
      this.route.params.subscribe((params) => {
        const articleId = params['id'];
        if (articleId) {
          this.loadArticle(articleId);
        }
      });
    }
  }

resetForm() {
  this.articleSelected = {} as Article;
  this.imgUrl = '';
  this.file = undefined as any;
  if (this.fileInput?.nativeElement) {
    this.fileInput.nativeElement.value = '';
  }

  this.cdr.detectChanges();
}

  loadArticle(id: number): void {
    this.articleService.getArticleById(id).subscribe({
      next: (response) => {
        this.articleSelected = response;
        console.log(response);
      },
      error: (err) => {
        console.error('Erro ao carregar artigo:', err);
      },
    });
  }


  voltarPagina(){
    this.router.navigate(['/articles']);
  }
onFileSelected(event: any){
  this.file = event.target.files[0];
  this.getImgUrl();
}
  saveArticle(){
    if(this.articleSelected.flUpdate){
      this.updateArticle();
    }else{
    this.articleService.saveArticle(this.articleSelected).subscribe(
      (response: any) =>{
        if(response.status == 201){
          console.log("Artigo cadastrado com sucesso!");
          this.resetForm();
        } else{
          this.toast.error("Erro ao cadastrar artigo!");
        }
      }
    )
    }
      
  }

  updateArticle(){    
      this.articleService.updateArticle(this.articleSelected).subscribe(
        (response: any) =>{
          if(response.status == 200){
            console.log("Livro atualizado com sucesso!");
            this.resetForm();
            this.voltarPagina();
          } else{
            this.toast.error("Erro ao atualizar artigo!");
          }
        }
      )
     
  }

  getImgUrl(){
    const forms = new FormData();
    forms.append("file",this.file)
    console.log("entrou");
    this.articleService.getImgUrl(forms).subscribe(      
      (result:any) =>{
          if(result.status == 200){
            this.articleSelected.imgUrl = result.body.url;
            console.log( result.body.url)
          }
      }
    )
  }
}
