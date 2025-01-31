import { Component, inject, Injectable, input } from '@angular/core'
import { User } from '../../_models/user'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatCardModule } from '@angular/material/card'
import { CommonModule } from '@angular/common'
import { MatDialog } from '@angular/material/dialog'
import { UploadPhotoComponent } from '../../_dialogs/upload-photo/upload-photo.component'
import { AccountService } from '../../_services/account.service'
import { TimeagoClock, TimeagoCustomFormatter, TimeagoDefaultClock, TimeagoFormatter, TimeagoIntl, TimeagoModule } from 'ngx-timeago'
import { strings as engString } from 'ngx-timeago/language-strings/en.js'
// @Injectable()
// class MyTntl extends TimeagoIntl { }
@Component({
  selector: 'app-photo',
  imports: [MatButtonModule, MatIconModule, MatCardModule, CommonModule],
  templateUrl: './photo.component.html',
  styleUrl: './photo.component.scss',
  providers: [
    { provide: TimeagoIntl, useClass: TimeagoIntl },
    { provide: TimeagoFormatter, useClass: TimeagoCustomFormatter },
    { provide: TimeagoClock, useClass: TimeagoDefaultClock },
  ]
})
export class PhotoComponent {
  // intl = inject(TimeagoIntl)
  user = input.required<User>()
  constructor(intl: TimeagoIntl) {
    intl.strings = engString
    intl.changes.next()
  }
  private accountService = inject(AccountService)
  private dialog = inject(MatDialog)
  openAddPhotoDialog() {
    const ref = this.dialog.open(UploadPhotoComponent)
    ref.afterClosed().subscribe(async file => {
      await this.accountService.updateProfile(file)
    })
  }
  deletePhoto(photo_id: string) {

  }
  setAvatar(photo_id: string) {
    this.accountService.setAvatar
  }

}
