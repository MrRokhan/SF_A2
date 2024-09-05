import { Component } from '@angular/core';
import { RouterOutlet, RouterModule } from '@angular/router';  // Import RouterModule

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [RouterOutlet, RouterModule]  // Add RouterModule here
})
export class DashboardComponent {}
