import { Injectable } from '@angular/core';
import { User } from './users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  
  addUser(user: any) {
    localStorage.setItem(user.phone, JSON.stringify(user));
  }

  getUsers(): User[] {
    const users: any[] = [];
    for(let key of Object.keys(localStorage)) {
      const ret = localStorage.getItem(key);
      if(ret)
        users.push(JSON.parse(ret));
    }
    return users;
  }

  getUser(key: any): User {
    let user !: User;
    const ret = localStorage.getItem(key);

    if(ret !== null)
      user = JSON.parse(ret);
    else {
      user = {
        firstName: '',
        lastName: '',
        gender: '',
        dateOfBirth: new Date,
        city: '',
        phone: '',
        email: ''
      }
    }

    return user;
  }

  constructor() { }
}
