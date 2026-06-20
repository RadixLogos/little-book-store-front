import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-alert',
  standalone: false,
  templateUrl: './modal-alert.html',
  styleUrl: './modal-alert.css',
})
export class ModalAlert {
  @Input() isOpen: boolean = false;
  @Input() type: 'success' | 'error' = 'success';
  @Input() title: string = '';
  @Input() message: string = '';
  
  @Output() onClose = new EventEmitter<void>();

  close() {
    this.onClose.emit();
  }

  get icon(): string {
    return this.type === 'success' ? '✓' : '✕';
  }

  get headerClass(): string {
    return this.type === 'success' ? 'bg-success' : 'bg-danger';
  }

  get buttonClass(): string {
    return this.type === 'success' ? 'btn-success' : 'btn-danger';
  }
}
