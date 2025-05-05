import { Component } from '@angular/core';
import { UserEntity } from '../../../core/entity/user.entity';
import { UserServiceService } from '../../../core/services/user-service.service';
import { DataService } from '../../data.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-users',
  imports: [NgFor],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  users: UserEntity[] = [];

  constructor(private dataService: DataService, private userService: UserServiceService) {
    this.dataService.getData().subscribe(users => this.users = users);
  }

  deleteUser(id: number) {
    if (window.confirm('Voulez-vous supprimer cet utilisateur ?')) {
      this.userService.deleteUser(id).subscribe(user => {
        this.users = this.users.filter(user => user.id !== id)
      })
    }
  }

}
