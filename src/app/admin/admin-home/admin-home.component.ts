import { Component, OnInit } from '@angular/core';
import { UserEntity } from '../../../core/entity/user.entity';
import { DataService } from '../../data.service';
import { RouterLink } from '@angular/router';
import { UserServiceService } from '../../../core/services/user-service.service';

@Component({
  selector: 'app-admin-home',
  imports: [RouterLink],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.scss'
})
export class AdminHomeComponent implements OnInit {
  users: UserEntity[] = []

  constructor(private dataService: DataService) {}

  ngOnInit() {
   this.dataService.getData().subscribe(users => this.users = users);
  }
}
