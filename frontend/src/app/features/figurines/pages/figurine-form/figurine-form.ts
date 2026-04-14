import { Component, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { form, required, FormField, FormRoot } from '@angular/forms/signals';
import { ManufacturesService } from '../../../manufacturer/services/manufactures';
import { Manufacturer } from '../../../manufacturer/models/manufacturer.model';
import { FigurinesStore } from '../../store/figurines.store';
import { CreateFigurineDto } from '../../models/figurine.model';
import { CdkDragDrop, moveItemInArray, CdkDropList, CdkDrag } from '@angular/cdk/drag-drop';

interface FigurineCreateForm {
  figurineName: string;
  manufacturer: string;
  description: string;
  imageToken: string;
}

type PhotoItem = {
  id: string;
  file: File;
  previewUrl: string;
};

@Component({
  selector: 'app-figurine-form',
  imports: [FormField, FormRoot, CdkDropList, CdkDrag],
  templateUrl: './figurine-form.html',
  styleUrl: './figurine-form.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FigurineForm {
  store = inject(FigurinesStore);
  private router = inject(Router);
  imageError = signal<string | null>(null);
  photoError = signal<string | null>(null);
  isDragOver = signal(false);
  photos = signal<PhotoItem[]>([]);
  readonly MAX_PHOTOS = 8;

  private uid() {
    if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
      return crypto.randomUUID();
    }
    return Math.random().toString(36).slice(2);
  }

  private addFiles(files: File[]) {
    this.photoError.set(null);
    const current = this.photos();
    const remaining = this.MAX_PHOTOS - current.length;
    const toAdd = files.slice(0, remaining);

    if (toAdd.length === 0) {
      this.photoError.set(`Możesz dodać maksymalnie ${this.MAX_PHOTOS} zdjęć.`);
      return;
    }

    const items: PhotoItem[] = toAdd
      .filter((f) => f.type.startsWith('image/'))
      .map((file) => ({
        id: this.uid(),
        file: file,
        previewUrl: URL.createObjectURL(file),
      }));

    this.photos.set([...current, ...items]);
  }

  removePhoto(id: string) {
    const current = this.photos();
    const toRemove = current.find((p) => p.id === id);
    if (toRemove) URL.revokeObjectURL(toRemove.previewUrl);
    this.photos.set(current.filter((p) => p.id !== id));
  }

  setAsCover(index: number) {
    const current = [...this.photos()];
    if (index < 0 || index >= current.length) return;
    const [picked] = current.splice(index, 1);
    current.unshift(picked);
    this.photos.set(current);
  }

  onPhotosSelected(evt: Event) {
    const input = evt.target as HTMLInputElement;
    const files = Array.from(input.files ?? []);
    if (!files.length) return;
    this.addFiles(files);
    input.value = '';
  }

  onDropPhotos(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.isDragOver.set(false);
    const files = Array.from(e.dataTransfer?.files ?? []);
    if (!files.length) return;
    this.addFiles(files);
  }
  onDragOverPhotos(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.isDragOver.set(true);
  }
  onDragLeavePhotos(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.isDragOver.set(false);
  }

  dropSort(event: CdkDragDrop<PhotoItem[]>) {
    const arr = [...this.photos()];
    moveItemInArray(arr, event.previousIndex, event.currentIndex);
    this.photos.set(arr);
  }

  protected formModel = signal<FigurineCreateForm>({
    figurineName: '',
    manufacturer: '',
    description: '',
    imageToken: '',
  });

  manufacturers = signal<Manufacturer[]>([]);

  constructor(private manufacturerService: ManufacturesService) {}

  ngOnInit() {
    this.manufacturerService.getAll().subscribe((manufacturers) => {
      this.manufacturers.set(manufacturers);
    });
  }

  protected form = form(
    this.formModel,
    (p) => {
      required(p.figurineName);
      required(p.manufacturer);
      required(p.description);
    },
    {
      submission: {
        action: async () => {
          const model = this.formModel();
          const figurine: CreateFigurineDto = {
            name: model.figurineName,
            manufacturer: model.manufacturer,
            description: model.description,
          };

          if (this.photos().length < 0) {
            this.photoError.set('Dodaj przynajmniej jedno zdjęcie.');
            return;
          }
          const formData = new FormData();
          formData.append('name', figurine.name);
          formData.append('manufacturer', figurine.manufacturer);
          formData.append('description', figurine.description);
          this.photos().forEach((p, i) => {
            const uuid = this.uid();
            if (i === 0) {
              formData.append('cover_photo', p.file, `${uuid}.jpg`);
            } else {
              formData.append('photo', p.file, `${uuid}.jpg`);
            }
          });
          console.log(formData);
          this.store.create(formData);
          // this.router.navigate(['/figurines']);
        },
      },
    },
  );

  protected canSubmit = computed(() => this.form().valid() && this.photos().length > 0);
}
