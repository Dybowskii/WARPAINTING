import { Component, inject } from '@angular/core';
import { FigurineCard } from '../../components/figurine-card/figurine-card';
import { FigurinesStore } from '../../store/figurines.store';

@Component({
  selector: 'app-figurines-list',
  imports: [FigurineCard],
  templateUrl: './figurines-list.html',
  styleUrl: './figurines-list.scss',
})
export class FigurinesList {
  store = inject(FigurinesStore);

  ngOnInit() {
    this.store.loadAll();
  }
}
