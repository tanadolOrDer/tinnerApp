import { Component, signal } from '@angular/core'
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms'
import { PasswordValidator } from '../validator/password.validator'
import { PasswordMatchValidator } from '../validator/password.match.validator'
import { CommonModule } from '@angular/common'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatButtonModule } from '@angular/material/button'
import { MatRadioModule } from '@angular/material/radio'
import { MatCardModule } from '@angular/material/card'


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, FormsModule, MatInputModule, MatIconModule, MatDatepickerModule, MatFormFieldModule,MatButtonModule,MatRadioModule,MatCardModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  mode: 'login' | 'register ' = 'login'
  form: FormGroup
  private readonly _correntYear = new Date().getFullYear()
  readonly minDate = new Date(this._correntYear - 70 ,0,1)
    readonly maxDate = new Date(this._correntYear - 18 ,11,31)
  readonly startDate = new Date(this._correntYear - 18 ,0,1)

  errorMessages = {
    username: signal(''),
    password: signal(''),
    display_name: signal(''),
    confirm_password: signal(''),
  }
  constructor() {
    this.form = new FormGroup({
      username: new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(16)]),
      password: new FormControl(null, [Validators.required, PasswordValidator(8, 16)]),

    })

  }
  toggleMode() {
    this.mode = this.mode === 'login' ? 'register ' : 'login'
    this.updateForm()
  }
  updateForm() {
    if (this.mode === 'register ') {
      this.form.addControl('confirm_password', new FormControl(null, Validators.required))
      this.form.addValidators(PasswordMatchValidator('password', 'confirm_password'))
      this.form.addControl('display_name', new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]))
      this.form.addControl('date_of_birth', new FormControl(null, Validators.required))
      this.form.addControl('gender', new FormControl(null, Validators.required))
      this.form.addControl('looking_for', new FormControl(null, Validators.required))
    } else {
      this.form.removeControl('confirm_password')
      this.form.removeValidators(PasswordMatchValidator('password', 'confirm_password'))
      this.form.removeControl('display_name')
      this.form.removeControl('date_of_birth')
      this.form.removeControl('gender')
      this.form.removeControl('looking_for')
    }
  }
  onSubmit() {

  }
  updateErrorMessage(ctrlName: string) {
    const control = this.form.controls[ctrlName]
    if (!control)
      return


    switch (ctrlName) {
      case 'username':
        if (control.hasError('required'))
          this.errorMessages.username.set('username not fond')
        else if (control.hasError('minlength'))
          this.errorMessages.username.set('must be at least 6 characters long')
        else if (control.hasError('maxlength'))
          this.errorMessages.username.set('must be 16 characters or fewer')
        else
          this.errorMessages.username.set('')
        break
      case 'password':
        if (!control.hasError('required'))
          this.errorMessages.password.set('required')
        else if (control.hasError('invalidMinlength'))
          this.errorMessages.password.set('must be at least 6 characters long')
        else if (control.hasError('invalidMaxlength'))
          this.errorMessages.password.set('must be 16 characters or fewer')
        else if (control.hasError('invalidLowerCase'))
          this.errorMessages.password.set('must contain minimum of 1 LowerCase letter ')
        else if (control.hasError('invalidUpperCase'))
          this.errorMessages.password.set('must contain minimum of 1 UpperCase')
        else if (control.hasError('invalidNumeric'))
          this.errorMessages.password.set('must contain minimum of 1 Numeric')
        else if (control.hasError('invalidSpecislChar'))
          this.errorMessages.password.set('must contain minimum of 1 SpecislChar')

        break
      case 'confirm_password':
        if (!control.hasError('required'))
          this.errorMessages.confirm_password.set('required')
        else if (control.hasError('misMatch'))
          this.errorMessages.confirm_password.set('do not math password')
        else
          this.errorMessages.confirm_password.set('')
        break
      case 'display_name':
        if (!control.hasError('required'))
          this.errorMessages.display_name.set('required')
        else if (control.hasError('minlength'))
          this.errorMessages.display_name.set('do not math password')
        else if (control.hasError('maxlength'))
          this.errorMessages.display_name.set('do not math password')
        else
          this.errorMessages.display_name.set('')

        break


    }
  }
}
