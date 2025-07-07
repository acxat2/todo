import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ITask, TasksService } from '../../services/tasks.service';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [RouterModule, MatSlideToggleModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css'
})
export class TaskItemComponent {
  @Input() data!: ITask

  public onDelete() {
    confirm('Вы уверены?') ? this.tasksService.deleteTask(this.data.id) : '';
  }
  public onMore() {
    this.router.navigate(['tasks', this.data.id])
  }

  public toggleChange() {
    this.tasksService.changeStatus(this.data.id)
  }

  constructor(private router: Router, private tasksService: TasksService) {

  }
}
