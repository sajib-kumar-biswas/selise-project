import { AfterViewInit, Component,ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../users';
import {MatSort} from '@angular/material/sort';
import { UsersService } from '../users.service';


@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})


export class UsersTableComponent implements AfterViewInit {

  displayedColumns: string[] = ['firstName', 'lastName', 'gender', 'dateOfBirth', 'email', 'phone', 'action'];

  users : User[] = [];

  dataSource = new MatTableDataSource<User>(this.users);

  @ViewChild(MatPaginator) paginator !: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.users = this.userService.getUsers();
    console.log(this.users)
    this.dataSource = new MatTableDataSource<User>(this.users);
  }

  onDelete(key: any) {
    localStorage.removeItem(key);
    this.ngOnInit()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  constructor(private userService: UsersService) {}
}
