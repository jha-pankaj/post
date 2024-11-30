import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { FormBuilder, ReactiveFormsModule ,FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  imports: [MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatListModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent implements OnInit {
  name: string = '';
  users: any[] = [];
  email:string = '';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe((res:any) => {
      this.users=res?.data?.users
    })
  }



  addUser() {
    this.userService.addUser(this.name,this.email).subscribe((res) => {
      console.log(res)
      this.getUsers()
    });
  }
}
