import { Component, OnInit } from '@angular/core';
import { UserEntity } from '../../../core/entity/user.entity';
import { DataService } from '../../data.service';
import { RouterLink } from '@angular/router';
import { UserServiceService } from '../../../core/services/user-service.service';
import { FumeurTypeEntity } from '../../../core/entity/fumeur-type.entity';
import { FumeurTypeService } from '../../../core/services/fumeur-type.service';
import { StatsService } from '../../../core/services/stats.service';
import { StatsEntity } from '../../../core/entity/stats.entity';

@Component({
  selector: 'app-admin-home',
  imports: [RouterLink],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.scss'
})
export class AdminHomeComponent implements OnInit {
  users: UserEntity[] = []
  types: FumeurTypeEntity[]= []
  stats: StatsEntity[]= []

  constructor(private dataService: DataService, private fumeurTypeService: FumeurTypeService, private statsService: StatsService) {}

  ngOnInit() {
   this.dataService.getData().subscribe(users => this.users = users);
   this.fumeurTypeService.getType().subscribe(types=>this.types=types)
   this.statsService.getAllStats().subscribe(stats=>this.stats=stats)
  }

}
