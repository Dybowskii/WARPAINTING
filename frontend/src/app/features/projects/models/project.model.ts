import { Figurine } from '../../figurines/models/figurine.model';

export interface Project {
  pk: string;
  name: string;
  description: string;
  figurine: Figurine;
}
