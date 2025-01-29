import { CommonModule } from '@angular/common'
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { fileTypeFromBlob } from 'file-type'
import {
  MatDialogRef,
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle,

} from '@angular/material/dialog'
import { count } from 'rxjs'

@Component({
  selector: 'app-upload-photo',
  imports: [CommonModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatButtonModule,],
  templateUrl: './upload-photo.component.html',
  styleUrl: './upload-photo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UploadPhotoComponent {
  acceptedImageType = ['image/jpeg', 'image/png']
  imgFile: File | undefined
  imgPreview = signal<undefined | string>(undefined)
  errorMessage = signal<undefined | string>(undefined)
  private readonly dialogRef = inject(MatDialogRef<UploadPhotoComponent>)
  onSubmit() {
    this.dialogRef.close(this.imgFile)
  }
  async onImgPicked(event: Event) {
    this.imgPreview.set(undefined)
    this.errorMessage.set(undefined)
    this.imgFile = undefined
    const input = event.target as HTMLInputElement
    if (input.files && input.files.length > 0) {
      this.imgFile = input.files[0]
      const filetype = await fileTypeFromBlob(this.imgFile)
      if (filetype && this.acceptedImageType.includes(filetype.mime)) {
        const fileReader = new FileReader()
        fileReader.onload = () => {
          this.imgPreview.set(fileReader.result as string)
        }
        fileReader.readAsDataURL(this.imgFile)
      } else {
        this.imgFile = undefined
        this.errorMessage.set('Image must be .jpeg or .png')
      }
    }
  }
}
