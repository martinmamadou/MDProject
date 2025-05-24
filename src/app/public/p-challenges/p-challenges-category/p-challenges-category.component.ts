import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChallengeCategoryService } from '../../../../core/services/challenge-category.service';
import { ChallengeCategoryEntity } from '../../../../core/entity/challenge-category.entiy';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-p-challenges-category',
  imports: [RouterModule, CommonModule],
  templateUrl: './p-challenges-category.component.html',
  styleUrl: './p-challenges-category.component.scss'
})
export class PChallengesCategoryComponent {
  categories: ChallengeCategoryEntity[] = [];
  constructor(
    private challengeCategoryService: ChallengeCategoryService,
    private router: Router
  ) {
    this.challengeCategoryService.getChallengeCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  goToChallengeList(categoryName: string) {
    this.router.navigate(['/challenges/list/', categoryName]);
  }
}
