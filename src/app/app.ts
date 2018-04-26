import { Component } from '@angular/core';

@Component({
  selector: 'app',
  template: `
    <div class="container">
        <router-outlet class="row"></router-outlet>
    </div>
  `
})
export class App {}
