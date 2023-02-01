import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../users.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../users';
import { Router } from '@angular/router';

@Component({
  selector: 'app-input-form',
  templateUrl: './input-form.component.html',
  styleUrls: ['./input-form.component.css']
})

export class InputFormComponent implements OnInit {

  //
  initUser: User = {
    firstName: '',
    lastName: '',
    gender: '',
    dateOfBirth: new Date,
    city: '',
    phone: '',
    email: ''
  }

  mindate!: Date;
  maxdate!: Date;

  // form builder helped to initialize form initial
  userForm = this.fb.group({
    firstName: [this.initUser.firstName, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],

    lastName: [this.initUser.lastName, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],

    gender: [this.initUser.gender, [Validators.required]],

    dateOfBirth: [this.initUser.dateOfBirth, [Validators.required]],

    city: [this.initUser.city],

    phone: [this.initUser.phone, [Validators.required,Validators.pattern(/01[^012][0-9]{8}/)]],

    email: [this.initUser.email, [Validators.required]]
  })

  constructor(private userService: UsersService, private route: ActivatedRoute, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    const phone = this.route.snapshot.paramMap.get('phone');
    if (phone !== 'blank') {
      this.initUser = this.userService.getUser(phone);
    }
    this.userForm = this.fb.group(
      {
        firstName: [this.initUser.firstName, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],

        lastName: [this.initUser.lastName, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],

        gender: [this.initUser.gender, [Validators.required]],

        dateOfBirth: [this.initUser.dateOfBirth, [Validators.required]],

        city: [this.initUser.city],

        phone: [this.initUser.phone, [Validators.required,Validators.pattern(/01[^012][0-9]{8}/)]],

        email: [this.initUser.email, [Validators.required]]
      }
    )

    const curretYear = new Date().getFullYear();
    this.mindate = new Date(curretYear-100,1,1);
    this.maxdate = new Date();
    console.log(this.initUser)
    console.log(this.userForm)
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
