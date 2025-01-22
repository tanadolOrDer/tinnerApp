import { inject, Injectable } from '@angular/core'
import { NgxSpinnerService } from 'ngx-spinner'

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  loadingRequesCount = 0

  private spinner = inject(NgxSpinnerService)
  constructor() { }

  loading() {
    this.loadingRequesCount++
    this.spinner.show(undefined, {
      type: "ball-scale-ripple",
      bdColor: 'hsl(0, 92.80%, 49.00%)',
      color: 'hsla(0, 9.10%, 97.80%, 0.52)',
      fullScreen: true
    })
  }

  idle() {
    this.loadingRequesCount--
    if (this.loadingRequesCount <= 0) {
      this.loadingRequesCount = 0
      this.spinner.hide()
    }
  }
}
