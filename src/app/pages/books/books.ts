import { Component, NgZone, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../../services/book-service';
import { LoaderService } from '../../services/loader';
import { Book } from '../../entities/book';
import { Genre } from '../../entities/Genre';
import { Editor } from '../../entities/editor';
import { EditorService } from '../../services/editor-service';
import { BookFilter } from '../../entities/BookFilter';
import { BookResponse } from '../../entities/BookResponse';
import { GenreService } from '../../services/genre-service';

@Component({
  selector: 'app-books',
  standalone: false,
  templateUrl: './books.html',
  styleUrl: './books.css',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class Books implements OnInit{
books: Book[] = [];
book: Book = {} as Book;
editorId ="";
genreId = ""; 
bookFilter: BookFilter = {} as BookFilter;
genres: Genre[] = [];
editors: Editor[] = [];
totalPages : number = 0;
currentPage: number = 0;

@Output() bookSelected = new EventEmitter<Book>();
constructor(
  private service: BookService,
  private editorService: EditorService, 
  public loaderService: LoaderService, 
  private zone: NgZone, 
  private cdr: ChangeDetectorRef,
  private router: Router,
  private genreService: GenreService
){}

ngOnInit(): void {
  if(this.books.length == 0){
    console.log('Carregando livros...');
    this.loadBooks();
    this.loadEtitors();
    this.loadGenres();
  }
}

sendBook(book: Book): void {
  this.bookSelected.emit(book);
}

findBookById(id: number): Book {
  this.service.getBookById(id).subscribe({
    next: (response: any) => {
      this.zone.run(() => {
       this.book = response;
       this.cdr.detectChanges(); 
       return response;
      });
    },
    error: (err) => {
      console.error('Erro ao buscar livro por ID:', err);
      alert('Erro ao buscar livro por ID: ' + (err?.error?.message || err.message || err));
      return {} as Book;
    }
  });
  return {} as Book; // Retorna um objeto vazio enquanto aguarda a resposta da API
  }

loadGenres() {
  this.genreService.getAllGenres().subscribe(
    (response: any) =>{
      console.log('Gêneros:', response);
      this.genres = Array.isArray(response.body) ? response.body : [];
      console.log('Gêneros carregados:', this.genres);
    },
    (error: any) =>{
      console.log("Erro ao carregar gêneros", error);
      this.genres = [];
    }
  )

}

loadEtitors(){
  this.editorService.getAllEditors().subscribe(
    (response: any) => {
      console.log('Editoras:', response);
      this.editors = Array.isArray(response.body) ? response.body :  [];
      console.log('Editoras carregadas:', this.editors);
    },
    (error: any) =>{
      console.log("Erro ao carregar editoras", error);
      this.editors = [];
    }
  )

}

loadBooks() {
  this.loaderService.show();
  this.bookFilter.editorId = this.editorId ? parseInt(this.editorId) : 0;
  this.bookFilter.genreId = this.genreId ? parseInt(this.genreId) : 0;
  console.log('Filtro de livros:', this.bookFilter);
  this.service.getBooks(this.bookFilter,this.currentPage,10)
    .subscribe({
      next: (response: any) => {
        console.log('Resposta completa da API:', response);
        console.log('Tipo de response:', typeof response);
        console.log('É array?', Array.isArray(response));
        this.zone.run(() => {
          this.books = Array.isArray(response) ? response : response.content || [];
          this.totalPages = response.totalPages;
          this.cdr.detectChanges();
        });
        console.log('Livros carregados:', this.books);
      },
      error: (err) => {
        console.error('Erro ao carregar livros:', err);
        this.books = [];
      },
      complete: () => {
        this.loaderService.hide();
      }
    });

  }


selectedImage: string | null = null;

openImage(img: string) {
  this.selectedImage = img;
}

filterChange(){
  this.currentPage = 0;
  this.loadBooks();
}
closeImage() {
  this.selectedImage = null;
}

    deleteBook(book: Book): void {
      if (confirm(`Tem certeza que deseja deletar o livro "${book.name}"?`)) {
        this.loaderService.show();
        this.service.deleteBook(book.id).subscribe({
          next: () => {
            this.books = this.books.filter(b => b.id !== book.id);
            this.cdr.detectChanges();
          },
          error: (err) => {
            alert('Erro ao deletar livro: ' + (err?.error?.message || err.message || err));
          },
          complete: () => {
            this.loaderService.hide();
            this.loadBooks(); // Recarrega a lista de livros após a exclusão

          }
        });
      }
    }


isUnavailable(book: Book): boolean {
  return book.stockQuantity === 0;
}

viewDetails(book: Book ): void {
   this.router.navigate(['/book-details', book.id], {
    state: { book: book }
  });
}

nextPage(){
  if(this.currentPage <= this.totalPages -1){
    this.currentPage++;
    this.loadBooks();
  }

  
}

backPage(){
   if(this.currentPage >= this.totalPages -1){
    this.currentPage--;
    this.loadBooks();
  } 
  }
}
