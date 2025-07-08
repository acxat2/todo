import { Component } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import { TaskItemComponent } from '../../components/task-item/task-item.component';
import { ITask, TasksService } from '../../services/tasks.service';
import { FormNewComponent } from '../../components/form/form-new.component';
import { taskForm } from '../../types/types';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [MatListModule, TaskItemComponent, FormNewComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})

export class TasksComponent {
  public data!: ITask[]
  public formNew: boolean = false;

  public openModal() {
    this.formNew = true;
  }

  public saveTask(event: taskForm): void {
    const task: ITask = {
      id: 5,
      title: event.title,
      description: event.description,
      status: event.status
    };

    this.tasksService.addTask(task)

  }

  public closeModal() {
    this.formNew = false;
  }
  constructor(private tasksService: TasksService) {
    this.data = tasksService.getTasks();
  }
}
