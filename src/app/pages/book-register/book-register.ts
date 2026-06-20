import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { BookService } from '../../services/book-service';
import { Book } from '../../entities/book';
import { ToastrService } from 'ngx-toastr';
import { Editor } from '../../entities/editor';
import { EditorService } from '../../services/editor-service';
import { GenreService } from '../../services/genre-service';
import { Genre } from '../../entities/Genre';

@Component({
  selector: 'app-book-register',
  standalone: false,
  templateUrl: './book-register.html',
  styleUrl: './book-register.css',
})
export class BookRegister implements OnInit{
  
  @ViewChild('fileInput') fileInput?: ElementRef<HTMLInputElement>;

  constructor(private bookService: BookService, private editorService: EditorService, private genreService: GenreService,
    private toast: ToastrService, private cdr: ChangeDetectorRef, private zone: NgZone){}
  bookSelected2: Book = {} as Book;
  @Input() bookSelected!: Book;
  setOfGenresIds: Set<number> = new Set<number>();
  file!: File;
  imgUrl: string = '';
  selectedEditor : Editor | null = null;
  editors: Editor[] = [] // ;
  @Output() voltar = new EventEmitter();
  genres : Genre[] = [];
  ngOnInit(): void {
    this.getAllEditors();
    this.findAllGenres();
    this.prepareBookSelected();
  }


  prepareBookSelected(){
    if(this.bookSelected.id != null){
      this.selectedEditor = this.bookSelected.editor;
    }
  }

resetForm() {
  this.bookSelected = {} as Book;
  this.selectedEditor = null;
  this.imgUrl = '';
  this.file = undefined as any;

  if (this.fileInput?.nativeElement) {
    this.fileInput.nativeElement.value = '';
  }

  this.cdr.detectChanges();
}

  


  voltarPagina(){
    this.voltar.emit();
  }
onFileSelected(event: any){
  this.file = event.target.files[0];
  
  this.getImgUrl();
}
  saveBook(){
    this.selectedEditor == null ? undefined : this.selectedEditor;
    this.bookSelected.editor = this.selectedEditor!;
    if(this.bookSelected.id !=null){
      console.log(this.bookSelected.id);
      console.log(this.bookSelected.price);
      console.log(this.bookSelected.author);
      console.log(this.bookSelected.editor);
      this.bookService.updateBook(this.bookSelected).subscribe(
        (response: any) =>{
          if(response.status == 200){
            this.toast.success("Livro atualizado com sucesso!");
            this.resetForm();
            this.voltar.emit();
          } else{
            this.toast.error("Erro ao atualizar livro!");
          }
        }
      )
      return;
    }
      console.log(this.bookSelected.editor);
    this.bookService.saveBook(this.bookSelected).subscribe(
      (response: any) =>{
        if(response.status == 201){
          this.toast.success("Livro cadastrado com sucesso!");
          this.resetForm();
          this.voltar.emit();
        } else{
          this.toast.error("Erro ao cadastrar livro!");
        }
      }
    )
  }

  getAllEditors(){
    this.editorService.getAllEditors().subscribe(
      {     
      next: (response: any) =>{
        if(response.status == 200){
          console.log(response.body);
          this.zone.run(()=>{
            this.editors = Array.isArray(response.body) ? response.body as Editor[] : [];
            this.cdr.detectChanges(); 
          })
          
          console.log(this.editors); 
        }
      }}
    ) 
  }

  toggleGenre(event: Event,genre: Genre) {
    const checked = (event.target as HTMLInputElement).checked;
    if(checked){
      if(this.bookSelected.genres.find(g => g.id === genre.id)) {
        return;
      }
      this.bookSelected.genres.push(genre);
    } else{
      this.bookSelected.genres = this.bookSelected.genres.filter(g => g.id !== genre.id);
    }
    
    
    this.cdr.detectChanges();
  } 

  findAllGenres(){
    this.genreService.getAllGenres().subscribe(
      (response: any) =>{
        if(response.status == 200){
          this.zone.run(()=>{
            this.genres = Array.isArray(response.body) ? response.body as Genre[] : [];
            this.cdr.detectChanges(); 
          })
        }
      }
    )
  }
  getImgUrl(){
    const forms = new FormData();
    forms.append("file",this.file)
    console.log("entrou");
    this.bookService.getImgUrl(forms).subscribe(      
      (result:any) =>{
          if(result.status == 200){
            this.bookSelected.imgUrl = result.body.url;
          }
      }
    )
  }

}
