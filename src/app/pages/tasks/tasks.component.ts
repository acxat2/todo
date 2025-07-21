import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { Subject } from 'rxjs';
import { FormNewComponent } from '../../components/form/form-new.component';
import { TaskItemComponent } from '../../components/task-item/task-item.component';
import { DbService } from '../../services/db.service';
import { ITask, taskForm } from '../../types/types';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [MatListModule, TaskItemComponent, FormNewComponent, CommonModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})

export class TasksComponent {
  public data$!: Subject<ITask[] | []>
  public formNew: boolean = false;

  public openModal() {
    this.formNew = true;
  }

  public saveTask(event: taskForm): void {
    const task: taskForm = {
      title: event.title,
      description: event.description,
      status: event.status
    };

    this.dbService.add(task)
    this.closeModal()
  }

  public closeModal() {
    this.formNew = false;
  }

  constructor(private dbService: DbService) {
    if (!this.dbService.isActive()) {

      this.dbService.dbInitialized.subscribe(() => {
        this.dbService.getAll()
        this.data$ = this.dbService.tasks$
      })
    } else {
      this.dbService.getAll();
      this.data$ = this.dbService.tasks$
    }
  }
}
