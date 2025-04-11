import { Component, inject } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { debounceTime, delay, map, of } from 'rxjs';
import { FormBuilder, ReactiveFormsModule, Validators, AsyncValidatorFn } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private loginService = inject(LoginService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  loginForm = this.fb.group({
    username: [
      '',
      [Validators.required],
      [this.usernameExistsValidator()]
    ],
    password: ['', Validators.required]
  });

  get usernameControl() {
    return this.loginForm.get('username')!;
  }

  usernameExistsValidator(): AsyncValidatorFn {
    return (control) => {
      return of(this.loginService.isUsernameExist(control.value))
        .pipe(
          map(exists => (exists ? null : { notExist: true }))
        );
    };
  }

  ngOnInit() {
    this.usernameControl.valueChanges.pipe(debounceTime(500)).subscribe();
  }

  onSubmit() {
    const { username, password } = this.loginForm.value;
    if (this.loginService.login(username!, password!)) {
      this.router.navigate(['/todos']);
    } else {
      alert('Invalid credentials!');
    }
  }
}
