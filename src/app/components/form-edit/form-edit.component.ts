// import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ITask } from '../../types/types';

@Component({
  selector: 'app-form-edit',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, FormsModule],
  templateUrl: './form-edit.component.html',
  styleUrl: './form-edit.component.css'
})
export class FormEditComponent {
  @Input() data!: ITask;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<ITask>();

  public sendForm(form: NgForm): void {
    if (form.controls['title'].status === 'INVALID') {
      alert('Не указано название задачи')
      return;
    }

    if (this.data.title !== form.controls['title'].value || this.data.description !== form.controls['description'].value)
    this.save.emit(
      {
        id: this.data.id,
        title: form.controls['title'].value,
        description: form.controls['description'].value,
        status: 'не выполнена'
      }
    );

    this.close.emit()
  }

  public del() {
    this.close.emit()
  }
}
