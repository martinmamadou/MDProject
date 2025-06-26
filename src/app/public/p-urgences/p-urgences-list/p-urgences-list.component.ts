import { Component, OnInit } from '@angular/core';
import { EmergencyService } from '../../../../core/services/emergency.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserServiceService } from '../../../../core/services/user-service.service';
import { UserEntity } from '../../../../core/entity/user.entity';
import { CommonModule } from '@angular/common';

interface Urgency {
  name: string;
  description: string;
  isExpanded?: boolean;
}

@Component({
  selector: 'app-p-urgences-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './p-urgences-list.component.html',
  styleUrl: './p-urgences-list.component.scss'
})
export class PUrgencesListComponent implements OnInit {
  user!: UserEntity;
  urgences: any[] = [];
  categoryName: string = '';

  constructor(
    private emergencyService: EmergencyService,
    private route: ActivatedRoute,
    private userService: UserServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userService.getUserConnected().subscribe((user) => {
      this.user = user;
    });
    this.loadUrgencesByCategory();
  }

  private loadUrgencesByCategory() {
    this.route.params.subscribe(params => {
      const categoryName = params['category'];
      this.categoryName = categoryName;
      console.log("this.categoryName", this.categoryName);

      this.emergencyService.getEmergencyCategories().subscribe(categories => {
        console.log("Noms des catégories:", categories.map(cat => cat.name));
        const category = categories.find(cat => cat.name.toLowerCase() === categoryName.toLowerCase());
        console.log("Catégorie trouvée:", category);

        if (category) {
          console.log("category", category);
          this.emergencyService.getEmergencyByCategory(category.id).subscribe(rewards => {
            console.log("Récompenses trouvées:", rewards);
            // Construire l'URL complète pour chaque récompense
            this.urgences = rewards.map(reward => ({
              ...reward,

            }));
            console.log("les urgences", this.urgences);
          });
        }
      });
    });
  }

  toggleDescription(urgency: Urgency): void {
    urgency.isExpanded = !urgency.isExpanded;
  }
}