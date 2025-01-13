import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-page-2',
  standalone: false,
  
  templateUrl: './sign-up-page-2.component.html',
  styleUrl: './sign-up-page-2.component.css'
})
export class SignUpPage2Component {
  
  constructor(private router: Router) { }

  navigateToSignUp3() {
    this.router.navigate(['/signup-step3']);
  }
}
