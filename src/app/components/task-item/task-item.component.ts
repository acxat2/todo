import { Component, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { DbService} from '../../services/db.service';
import { ITask } from '../../types/types';
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
    confirm('Вы уверены?') ? this.dbService.delete(this.data.id) : '';
  }
  public onMore() {
    this.router.navigate(['tasks', this.data.id])
  }

  public toggleChange() {
    this.dbService.toggleStatus(this.data)
  }

  constructor(private router: Router, private dbService: DbService) {

  }
}
