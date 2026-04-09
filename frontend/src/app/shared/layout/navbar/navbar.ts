import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/internal/operators/filter';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  private title$ = this.router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    map(() => {
      let route = this.route.firstChild;
      while (route?.firstChild) {
        route = route.firstChild;
      }
      return route?.snapshot.data['title'] ?? 'Warpainting';
    }),
  );

  title = toSignal(this.title$, { initialValue: 'Warpainting' });
}
