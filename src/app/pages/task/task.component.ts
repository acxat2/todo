import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DbService} from '../../services/db.service';
import { ITask } from '../../types/types';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  public data$!: Observable<ITask | null>;

  public back() {
    this.router.navigate(['tasks'])
  }

  public toggleStatus(data: ITask) {
    this.dbService.toggleStatus(data)
  }

  constructor(private route: ActivatedRoute, private dbService: DbService, private router: Router) {
    const id = this.route.snapshot.paramMap.get('id') as any as number;
    if (id) {
      if (!dbService.isActive()) {
        dbService.dbInitialized.subscribe(() => {
          this.dbService.get(+id);
          this.data$ = dbService.task$;
        })
      } else {
        this.dbService.get(+id);
        this.data$ = dbService.task$;
      }
    }
  }
}
