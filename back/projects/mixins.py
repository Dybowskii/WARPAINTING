class ImageSaveMinix:
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if self.image:
            self.name = self.image.name
            super().save(update_fields=['name'])
