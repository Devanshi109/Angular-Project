import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-main-section',
  standalone: false,

  templateUrl: './main-section.component.html',
  styleUrl: './main-section.component.css'
})
export class MainSectionComponent {

  emailForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  navigateToSignUp() {
    if (this.emailForm.valid) {
      const email = this.emailForm.get('email')?.value;
      sessionStorage.setItem('email', email);
      this.router.navigate(['/signup-step1']);
    } else {
      alert('Please enter a valid email address.');
    }
  }

}
