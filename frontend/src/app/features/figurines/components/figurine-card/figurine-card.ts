import { Component, input } from '@angular/core';
import { Figurine } from '../../models/figurine.model';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-figurine-card',
  imports: [RouterLink],
  templateUrl: './figurine-card.html',
  styleUrl: './figurine-card.scss',
})
export class FigurineCard {
  figurine = input.required<Figurine>();

  ngOnInit(): void {
    console.log(this.figurine());
    console.log('test');
  }
}
