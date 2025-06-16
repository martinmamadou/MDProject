import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserEntity } from '../../../core/entity/user.entity';
import { UserServiceService } from '../../../core/services/user-service.service';
@Component({
  selector: 'app-p-urgences',
  imports: [RouterOutlet],
  templateUrl: './p-urgences.component.html',
  styleUrl: './p-urgences.component.scss'
})
export class PUrgencesComponent {
  
}
