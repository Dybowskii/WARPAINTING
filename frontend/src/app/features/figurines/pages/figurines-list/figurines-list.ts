import { Component, inject } from '@angular/core';
import { FigurineCard } from '../../components/figurine-card/figurine-card';
import { FigurinesStore } from '../../store/figurines.store';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-figurines-list',
  imports: [FigurineCard, RouterLink],
  templateUrl: './figurines-list.html',
  styleUrl: './figurines-list.scss',
})
export class FigurinesList {
  store = inject(FigurinesStore);

  ngOnInit() {
    this.store.loadAll();
  }
}
