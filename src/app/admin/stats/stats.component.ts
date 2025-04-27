import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { StatsEntity } from '../../../core/entity/stats.entity';
import { StatsService } from '../../../core/services/stats.service';

@Component({
  selector: 'app-stats',
  imports: [NgFor],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss'
})
export class StatsComponent {
  stats: StatsEntity[] = [];

  constructor(private statService: StatsService) {
    this.statService.getAllStats().subscribe(stats => this.stats = stats);
  }
}
