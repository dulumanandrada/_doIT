import { Injectable } from '@angular/core';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  url = 'http://localhost:3100/users';

  async getUsers(): Promise<IUser[]> {
    const data = await fetch(`${this.url}`)
    return await data.json() ?? []
  }

  async getUserById(username: string): Promise<any> {
    //repara functia de login
    const data = await fetch(`${this.url}/${username}`)
    return await data.json() ?? {}
  }

  async addUser(user: IUser) {
    //verifica daca mai exista un user cu acest username 
    const data = await fetch(this.url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(user)
    }).then(res => res.json())
  }
}
