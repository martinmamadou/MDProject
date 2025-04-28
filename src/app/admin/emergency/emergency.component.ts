import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EmergencyService } from '../../../core/services/emergency.service';
import { EmergencyEntity } from '../../../core/entity/emergency.entity';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-emergency',
  standalone: true,
  imports: [RouterModule, NgFor],
  templateUrl: './emergency.component.html',
  styleUrl: './emergency.component.scss'
})
export class EmergencyComponent {
  emergencies: EmergencyEntity[] = [];

  constructor(private emergencyService: EmergencyService) {
    this.emergencyService.getEmergency().subscribe(emergencies => this.emergencies = emergencies);
  }

  deleteEmergency(id: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette urgence ?')) {
      this.emergencyService.deleteEmergency(id).subscribe({
        next: () => {
          this.emergencies = this.emergencies.filter(emergency => emergency.id !== id);
        },
        error: (error) => console.error('Erreur lors de la suppression:', error)
      });
    }
  }
}
