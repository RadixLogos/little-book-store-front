import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { Genre } from '../../entities/Genre';
import { GenreService } from '../../services/genre-service';
import { LoaderService } from '../../services/loader';

@Component({
  selector: 'app-genre-register',
  standalone: false,
  templateUrl: './genre-register.html',
  styleUrl: './genre-register.css',
})
export class GenreRegister {
  genreName: string = '';
  genre : Genre = {} as Genre;
  genreList: Genre[] = [];
 @Output() voltar = new EventEmitter();
  
 constructor(
    private genreService: GenreService,
    public loaderService: LoaderService,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit():void{
    this.loadGenres();
  }

  saveGenre(){ 
    this.genre.name = this.genreName;
    if(this.genre.id === null || this.genre.id === undefined ){
        this.genreService.insertGenre(this.genre).subscribe({
            next: (response : any) =>{
                if(response.status == 201){
                    console.log("Ediora salva com sucesso!");
                    this.genreName = '';
                    this.loadGenres();
                }
                else{
                    console.log(response);
                }
            }, error: (err:any)=> {
                console.log(err);
            }
        })

    }else{
        this.genreService.updateGenre(this.genre).subscribe({
            next: (response : any) =>{
                if(response.status == 201){
                    console.log("Ediora salva com sucesso!");
                }
                else{
                    console.log(response);
                }
            }, error: (err:any)=> {
                console.log(err);
            }
        })
    }
    
  }

  loadGenres(){
    this.genreService.getAllGenres().subscribe({
        next: (response : any) =>{
            this.genreList = response.body.content === null || response.body.content === undefined ? [] : response.body.content;
            this.cdr.detectChanges();
        },
        error : (err : any) => {
            console.log(err);
        }
    })
  }
    voltarPagina(){
    this.voltar.emit();
  }
  

}
