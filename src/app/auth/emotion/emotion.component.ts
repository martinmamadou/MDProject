import { Component, OnInit } from '@angular/core';
import { MoodTrackerService } from '../../../core/services/mood-tracker.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emotion',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './emotion.component.html',
  styleUrl: './emotion.component.scss'
})
export class EmotionComponent implements OnInit {

  emotionForm!: FormGroup;
  currentStep: number = 1;

  constructor(private MoodTrackerService: MoodTrackerService, private fb: FormBuilder, private router: Router) {
    this.emotionForm = this.fb.group({
      mood: ['', Validators.required],
      intensity: ['', Validators.required],
      catalyst: ['', Validators.required],
      notes: [''],
    });
  }

  ngOnInit(): void {
    this.MoodTrackerService.getMoodTracker().subscribe((moodTracker) => {
      console.log(moodTracker);
    });
  }

  nextStep() {
    if (this.currentStep < 2) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  onSubmit() {
    if (this.emotionForm.valid) {
      const formData = this.emotionForm.value;
      console.log('Données du formulaire émotion :', formData);
      this.MoodTrackerService.createMoodTracker(formData).subscribe((response) => {
        this.router.navigate(['/']);
        console.log('Réponse du serveur :', response);
      });
    } else {
        console.warn('Formulaire émotion invalide');
      }
  }
}
