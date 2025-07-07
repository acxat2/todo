import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ITask, TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  public data!: ITask;

  public back() {
    this.router.navigate(['tasks'])
  }

  public toggleStatus() {
    this.tasksService.changeStatus(this.data.id)
  }

  constructor(private route: ActivatedRoute, private tasksService: TasksService, private router: Router) {
    const id = this.route.snapshot.paramMap.get('id') as any as number;
    this.data = this.tasksService.getTask(id) as ITask;
  }
}
