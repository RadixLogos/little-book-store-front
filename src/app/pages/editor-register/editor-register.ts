// import { Component } from '@angular/core';
// import { EditorService } from '../../services/editor-service';
// import { LoaderService } from '../../services/loader';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// @Component({
//   selector: 'app-editor-register',
//   templateUrl: './editor-register.html',
//   styleUrls: ['./editor-register.css']
// })
// export class EditorRegisterComponent {
//   editorForm: FormGroup;
//   successMessage: string = '';
//   errorMessage: string = '';

//   constructor(
//     private fb: FormBuilder,
//     private editorService: EditorService,
//     public loaderService: LoaderService
//   ) {
//     this.editorForm = this.fb.group({
//       name: ['', Validators.required]
//     });
//   }

//   // submit() {
//   //   this.successMessage = '';
//   //   this.errorMessage = '';
//   //   if (this.editorForm.valid) {
//   //     this.loaderService.show();
//   //     this.editorService.createEditor(this.editorForm.value.name).subscribe({
//   //       next: () => {
//   //         this.successMessage = 'Editora cadastrada com sucesso!';
//   //         this.editorForm.reset();
//   //       },
//   //       error: (err) => {
//   //         this.errorMessage = 'Erro ao cadastrar editora: ' + (err?.error?.message || err.message || err);
//   //       },
//   //       complete: () => {
//   //         this.loaderService.hide();
//   //       }
//   //     });
//   //   }
//   // }
// }
