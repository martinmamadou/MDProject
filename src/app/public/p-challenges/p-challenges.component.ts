import { Component, OnInit } from '@angular/core';
import { ChallengeEntity } from '../../../core/entity/challenge.entity';
import { ChallengeService } from '../../../core/services/challenge.service';
import { UserServiceService } from '../../../core/services/user-service.service';
import { UserEntity } from '../../../core/entity/user.entity';
import { NgFor } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ActiveChallengeComponent } from '../../shared/active-challenge/active-challenge.component';

@Component({
  selector: 'app-p-challenges',
  imports: [NgFor, RouterOutlet, ActiveChallengeComponent],
  templateUrl: './p-challenges.component.html',
  styleUrl: './p-challenges.component.scss'
})
export class PChallengesComponent {

}
