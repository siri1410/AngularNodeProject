import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="container">
      <h1>Welcome to {{ title }}!</h1>
      <p>This is a basic Angular application.</p>
    </div>
  `,
  styles: [`
    .container {
      text-align: center;
      padding-top: 50px;
    }
    p {
      font-size: 18px;
      color: #666;
    }
  `]
})
export class AppComponent {
  title = 'angularnodeproject';
}
