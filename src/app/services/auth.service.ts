import { Injectable } from '@angular/core';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  url = 'http://localhost:3000/users';

  async getUsers(): Promise<IUser[]> {
    const data = await fetch(`${this.url}`)
    return await data.json() ?? []
  }

  async getUserById(id: string): Promise<any> {
    //repara functia de login
    try {
      const data = await fetch(`${this.url}/${id}`)
      return await data.json() ?? {}
    }
    catch(err){
      return err
    }
  }

  async addUser(user: IUser) {
    //verifica daca mai exista un user cu acest username 
    const data = await fetch(this.url, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(user)
    }).then(res => res.json())
  }

  public isAuthenticated(): boolean {
    const user = sessionStorage.getItem('user');
    if(user) return true
    else return false
  }
}
