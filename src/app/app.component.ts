import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  public title = 'ToDo';
  public visible = new BehaviorSubject(false);

  public scroll() {
    window.scrollTo(0, 0);
  }

  constructor() {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 200) {
        this.visible.next(true);
      } else {
        this.visible.next(false);
      }
    })
  }
}
