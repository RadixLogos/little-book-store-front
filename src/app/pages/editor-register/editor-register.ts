import { ChangeDetectorRef, Component, EventEmitter, NgModule, Output } from '@angular/core';
import { EditorService } from '../../services/editor-service';
import { LoaderService } from '../../services/loader';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Editor } from '../../entities/editor';
import { CommonModule } from '@angular/common';

@Component({
  standalone: false,
    selector: 'app-editor-register',
  templateUrl: './editor-register.html',
  styleUrls: ['./editor-register.css']
})
export class EditorRegisterComponent {
  editorName: string = '';
  editor : Editor = {} as Editor;
  editorList: Editor[] = [];
 @Output() voltar = new EventEmitter();
  
 constructor(
    private fb: FormBuilder,
    private editorService: EditorService,
    public loaderService: LoaderService,
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit():void{
    this.loadEditors();
  }

  saveEditor(){ 
    this.editor.name = this.editorName;
    if(this.editor.id === null || this.editor.id === undefined ){
        this.editorService.insertEditor(this.editor).subscribe({
            next: (response : any) =>{
                if(response.status == 201){
                    console.log("Ediora salva com sucesso!");
                    this.editorName = '';
                    this.loadEditors();
                }
                else{
                    console.log(response);
                }
            }, error: (err:any)=> {
                console.log(err);
            }
        })

    }else{
        this.editorService.updateEditor(this.editor).subscribe({
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

  loadEditors(){
    this.editorService.getAllEditors().subscribe({
        next: (response : any) =>{
            this.editorList = response.body.content === null || response.body.content === undefined ? [] : response.body.content;
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
