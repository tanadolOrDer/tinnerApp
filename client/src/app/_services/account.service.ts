import { inject, Injectable, signal } from '@angular/core'
import { environment } from '../../environments/environment'
import { HttpClient } from '@angular/common/http'
import { User } from '../_models/user'
import { firstValueFrom } from 'rxjs'
import { parseUserPhoto } from '../_helper/helper'
import { Photo } from '../_models/photo'

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private _key = 'account';
  private _baseApiUrl = environment.baseUrl + 'api/account/'
  private _http = inject(HttpClient)

  data = signal<{ user: User, token: string } | null>(null)

  constructor() {
    this.loadDataFromLocalStorage()
  }
  //#region "login_register"

  logout() {
    localStorage.removeItem(this._key)
    this.data.set(null)
  }

  async login(loginData: { username: string, password: string }): Promise<string> {
    try {
      const url = this._baseApiUrl + 'login'
      const response = this._http.post<{ user: User, token: string }>(url, loginData)
      const data = await firstValueFrom(response)
      data.user = parseUserPhoto(data.user)
      this.data.set(data)
      this.saveDataToLocalStorage()
      return ''
    } catch (error: any) {
      return error.error?.message
    }
  }

  async register(registerData: User): Promise<string> {
    try {
      const url = this._baseApiUrl + 'register'
      const response = this._http.post<{ user: User, token: string }>(url, registerData)
      const data = await firstValueFrom(response)
      data.user = parseUserPhoto(data.user)
      this.data.set(data)
      this.saveDataToLocalStorage()
      return ''
    } catch (error: any) {
      return error.error?.message
    }
  }

  private saveDataToLocalStorage() {
    const jsonString = JSON.stringify(this.data())
    localStorage.setItem(this._key, jsonString)
  }

  private loadDataFromLocalStorage() {
    const jsonString = localStorage.getItem(this._key)
    if (jsonString) {
      const data = JSON.parse(jsonString)
      this.data.set(data)
    }
  }
  //#endregion "My Region"
  async updateProfile(user: User): Promise<boolean> {
    const url = environment.baseUrl + 'api/user/'
    try {
      const response = this._http.patch(url, user)
      await firstValueFrom(response)
      const currentData = this.data()
      if (currentData) {
        currentData.user = user
        this.data.set(currentData)
        this.saveDataToLocalStorage()
      }
    } catch (error) {
      return false
    }
    return true
  }
  //#region "Upload Photo"
  async uploadPhoto(file: File): Promise<boolean> {
    const url = environment.baseUrl + 'api/photo/'
    const fromData = new FormData()
    fromData.append('file', file)
    try {
      const response = this._http.post<Photo>(url, fromData)
      const photo = await firstValueFrom(response)
      const user = this.data()!.user
      if (user) {
        if (!user.photos)
          user.photos = []
        user.photos?.push(photo)
        setUser(user)
        return true
      }

    } catch (error) {

    }
    return false

    function setUser(user: User) {
      const copyData = this.data()
      if (copyData)
        copyData.user = user
      this.data.set(copyData)
      this.saveDataToLocalStorage()
    }
  }
  //#endregion "My Region"
  async setAvatar(photo_id: string) {
    this.accountService
  }
}