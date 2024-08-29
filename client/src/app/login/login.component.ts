// import { Component } from '@angular/core';
// import { Router } from '@angular/router';
// import { FormsModule } from '@angular/forms'; // Correct import for FormsModule
// import { RouterOutlet } from '@angular/router';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css'],
//   standalone: true,
//   imports: [FormsModule, RouterOutlet] // Use FormsModule correctly here
// })
// export class LoginComponent {
//   username: string = '';
//   password: string = '';

//   constructor(private router: Router) {}

//   login() {
//     // Implement login logic here
//     if (this.username === 'admin' && this.password === 'admin') {
//       this.router.navigate(['/dashboard']);
//     } else {
//       alert('Invalid credentials');
//     }
//   }
// }

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule, RouterOutlet]
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  login() {
    if (this.username === 'admin' && this.password === 'admin') {
      this.router.navigate(['/dashboard']);
    } else {
      alert('Invalid credentials');
    }
  }
}

