import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmergencyService } from '../../../../core/services/emergency.service';
import { CommonModule } from '@angular/common';
import { EmergencyEntity } from '../../../../core/entity/emergency.entity';
import { EmergencyCategoryEntity } from '../../../../core/entity/emergency-category.entity';
import { EmergencyCategoryService } from '../../../../core/services/emergency-category.service';

@Component({
  selector: 'app-emergency-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './emergency-form.component.html',
  styleUrls: ['./emergency-form.component.scss']
})
export class EmergencyFormComponent implements OnInit {
  emergencyForm: FormGroup;
  isEditMode = false;
  emergencyId: number | null = null;
  categories: EmergencyCategoryEntity[] = [];
  constructor(
    private fb: FormBuilder,
    private emergencyService: EmergencyService,
    private emergencyCategoryService: EmergencyCategoryService,
    private route: ActivatedRoute,
    public router: Router
  ) {
    this.emergencyForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      tips: ['', Validators.required],
      category_id: ['', Validators.required]
    });
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.emergencyId = +id;
      this.emergencyService.getEmergencyById(this.emergencyId).subscribe(emergency => {
        this.emergencyForm.patchValue(emergency);
      });
    }
    this.emergencyService.getEmergencyCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  onSubmit() {
    if (this.emergencyForm.valid) {
      const emergency: EmergencyEntity = this.emergencyForm.value;

      if (this.isEditMode && this.emergencyId) {
        emergency.id = this.emergencyId;
        this.emergencyService.updateEmergency(emergency).subscribe({
          next: () => this.router.navigate(['/admin/emergency']),
          error: (error) => console.error('Erreur lors de la mise à jour:', error)
        });
      } else {
        this.emergencyService.createEmergency(emergency).subscribe({
          next: () => this.router.navigate(['/admin/emergency']),
          error: (error) => console.error('Erreur lors de la création:', error)
        });
      }
    }
  }
}
