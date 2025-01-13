import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-page-1',
  standalone: false,

  templateUrl: './sign-up-page-1.component.html',
  styleUrl: './sign-up-page-1.component.css',
})
export class SignUpPage1Component implements OnInit {
  signUpForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit() {
    const email = sessionStorage.getItem('email');
    if (email) {
      this.signUpForm.patchValue({ email });
    }
  }

  navigateToSignUp2() {
    if (this.signUpForm.valid) {
      this.router.navigate(['/signup-step2']);
    } else {
      alert('Please complete the form with valid data.');
    }
  }
}
