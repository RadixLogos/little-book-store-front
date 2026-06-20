import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book-service';
import { Book } from '../../entities/book';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.html',
  styleUrl: './book-details.css',
  changeDetection: ChangeDetectionStrategy.Default,
  standalone: false,
})
export class BookDetailsComponent implements OnInit {
  book: Book | null = null;
  isLoading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookService: BookService
  ) {}

  ngOnInit(): void {
    // Tentar obter o livro do state de navegação
    const bookFromState = window.history.state?.book;
    
    if (bookFromState) {
      this.book = bookFromState;
      this.isLoading = false;
    } else {
      // Se não houver no state, tentar buscar pela rota
      this.route.params.subscribe((params) => {
        const bookId = params['id'];
        if (bookId) {
          this.loadBook(bookId);
        }
      });
    }
  }

  loadBook(id: number): void {
    this.bookService.getBookById(id).subscribe({
      next: (response) => {
        this.book = response;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao carregar detalhes do livro:', err);
        this.isLoading = false;
      },
    });
  }

  isUnavailable(): boolean {
    return this.book ? this.book.stockQuantity === 0 : false;
  }

  addToCart(): void {
    if (this.book && !this.isUnavailable()) {
      // Implementar lógica de adicionar ao carrinho
      console.log('Adicionando livro ao carrinho:', this.book);
    }
  }

  goBack(): void {
    this.router.navigate(['/menu']);
  }

  
}
