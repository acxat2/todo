import { Component,ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { taskForm } from '../../types/types';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-new',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './form-new.component.html',
  styleUrl: './form-new.component.css'
})
export class FormNewComponent {
  @Output() close = new EventEmitter<void>()
  @Output() save = new EventEmitter<taskForm>()

  public sendForm(form: NgForm): void {
    if (form.controls['title'].status === 'INVALID') {
      alert('Не указано название задачи')
      return;
    }

    this.save.emit({title: form.controls['title'].value, description: form.controls['description'].value, status: 'не выполнена'})
  }

  public del() {
    this.close.emit()
  }

}
