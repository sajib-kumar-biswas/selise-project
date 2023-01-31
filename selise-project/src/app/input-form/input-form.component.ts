import { Component } from '@angular/core';
import { FormControl, FormGroup,FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../users.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../users';
import { Router } from '@angular/router';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css']
})

export class InputFormComponent {

  //
  initUser: User =  {
        firstName: '',
        lastName: '',
        gender: '',
        dateOfBirth: new Date,
        city: '',
        phone: '',
        email: ''
      }
      // form builder helped to initialize form initial
      userForm = this.fb.group({
      firstName: [this.initUser.firstName],
      lastName: [this.initUser.lastName],
      gender: [this.initUser.gender],
      dateOfBirth: [this.initUser.dateOfBirth],
      city: [this.initUser.city],
      phone: [this.initUser.phone],
      email: [this.initUser.email]
     })

  constructor(private userService: UsersService, private route: ActivatedRoute, private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    const phone = this.route.snapshot.paramMap.get('phone');
    if(phone !== 'blank') {
      this.initUser = this.userService.getUser(phone);
    }
     this.userForm = this.fb.group({
      firstName: [this.initUser.firstName],
      lastName: [this.initUser.lastName],
      gender: [this.initUser.gender],
      dateOfBirth: [this.initUser.dateOfBirth],
      city: [this.initUser.city],
      phone: [this.initUser.phone],
      email: [this.initUser.email]
     })
    console.log(this.initUser)
  }

  onSubmit() {
    // console.log(this.userForm.value);
    this.userService.addUser(this.userForm.value)
    this.router.navigate(['/users-table']);
  }

  onCancel() {
    this.router.navigate(['/users-table']);
  }

}
