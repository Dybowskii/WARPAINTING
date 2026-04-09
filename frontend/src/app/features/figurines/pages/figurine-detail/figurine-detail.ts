import { Component, inject, signal } from '@angular/core';

import { FigurinesService } from '../../services/figurines';
import { ActivatedRoute } from '@angular/router';
import { FigurinesStore } from '../../store/figurines.store';
@Component({
  selector: 'app-figurine-detail',
  imports: [],
  templateUrl: './figurine-detail.html',
  styleUrl: './figurine-detail.scss',
})
export class FigurineDetail {
  private route = inject(ActivatedRoute);
  store = inject(FigurinesStore);

  ngOnInit() {
    const pk = this.route.snapshot.paramMap.get('id');
    if (!pk) return;
    this.store.selectFigurine(pk);
    this.store.loadById(pk);
  }
}
