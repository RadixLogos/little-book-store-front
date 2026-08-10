import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loadingSubject = new BehaviorSubject<boolean>(false);

  loading$ = this.loadingSubject.asObservable();

  activeRequest = 0;
  show() {
    this.activeRequest ++;
    this.loadingSubject.next(true);
  }

  hide() {
    if(this.activeRequest > 0){
      this.activeRequest--;
    } 
    if(this.activeRequest === 0){
      this.loadingSubject.next(false);
    }
  }

  isLoading(): boolean {
    return this.loadingSubject.value;
  }
}