from os.path import basename, normpath, splitext
class ImageSaveMinix:
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if self.image:
            name = basename(normpath(self.image.name))
            self.name = splitext(name)[0]
            super().save(update_fields=['name'])
