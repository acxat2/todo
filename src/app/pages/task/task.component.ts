import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { DbService} from '../../services/db.service';
import { ITask } from '../../types/types';
import { FormEditComponent } from '../../components/form-edit/form-edit.component';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, FormEditComponent],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  public data$!: Subject<ITask | null>;
  public modalActive = false;

  public back() {
    this.router.navigate(['tasks'])
  }

  public openModal() {
    this.modalActive = true;
  }

  public edit(event: ITask) {
    this.data$.next(event)
    this.dbService.update(event)
  }

  public closeModal() {
    this.modalActive = false;
  }

  public toggleStatus(data: ITask) {
    this.dbService.toggleStatus(data);
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
