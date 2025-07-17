import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { taskForm, ITask } from '../../types/types';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form-edit',
  standalone: true,
  imports: [MatInputModule, MatFormFieldModule, FormsModule, CommonModule],
  templateUrl: './form-edit.component.html',
  styleUrl: './form-edit.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormEditComponent implements OnInit {
  @Input() data!: ITask;
  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<taskForm>();
  private jkl: ITask =     {
      "title": "1",
      "description": "afer",
      "status": "выполнена",
      "id": 7,
    }
  // public value$: BehaviorSubject<ITask> = new BehaviorSubject(this.jkl)

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

  ngOnInit(): void {
    console.log(this.data)
    // this.value$.next(this.data)
  }
}
