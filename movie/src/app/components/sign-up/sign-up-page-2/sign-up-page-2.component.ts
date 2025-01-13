import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up-page-2',
  standalone: false,
  
  templateUrl: './sign-up-page-2.component.html',
  styleUrl: './sign-up-page-2.component.css'
})
export class SignUpPage2Component{

  signup2form!: FormGroup;
  
  constructor(private fb: FormBuilder, private router: Router) { }

    ngOnInit(): void {
      this.signup2form = this.fb.group({
        username: ['', [Validators.required]],
        tmdb: ['', [Validators.required]],
      });
    }
 

  navigateToSignUp3() {
    if (this.signup2form.valid) {
      this.router.navigate(['/signup-step3']);
    } else {
      console.log('not valid');
    }
  }
}
