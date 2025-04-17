import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-success-page',
  templateUrl: './success-page.component.html',
  styleUrls: ['./success-page.component.css']
})
export class SuccessPageComponent implements OnInit {
  userName: string = '';
  
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Get the name from query parameters
    this.route.queryParams.subscribe(params => {
      this.userName = params['name'] || 'there';
    });
  }

  goBack(): void {
    this.router.navigate(['/']);
  }
} 