import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up-page-3',
  standalone:false,
  templateUrl: './sign-up-page-3.component.html',
  styleUrls: ['./sign-up-page-3.component.css']
})
export class SignUpPage3Component {
  selectedPlan: string | null = null;

  rowData = [
    { title: 'Monthly Price', basic: '$9.99', standard: '$15.49', premium: '$19.99' },
    { title: 'Video Quality', basic: 'Good', standard: 'Better', premium: 'Best' },
    { title: 'Resolution', basic: '480p', standard: '1080p', premium: '4K + HDR' },
    { 
      title: 'Watch on your TV, computer, mobile phone and tablet', 
      basic: '✔', 
      standard: '✔', 
      premium: '✔' 
    }
  ];

  constructor(private router: Router) {}

  selectPlan(plan: string) {
    this.selectedPlan = plan;
  }

  navigateToMovielist() {
    if (this.selectedPlan) {
      console.log('Selected Plan:', this.selectedPlan); 
      this.router.navigate(['/movies']);
    } else {
      alert('Please select a plan before proceeding.');
    }
  }
}

