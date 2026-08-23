import { Component, inject } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatToolbarModule } from '@angular/material/toolbar'
import { Router, RouterOutlet } from '@angular/router'

@Component({
  selector: 'app-root',
  imports: [MatButtonModule, MatToolbarModule, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  router = inject(Router)

  isHomePage() {
    return this.router.url === '/'
  }

  navigateToDetail() {
    this.router.navigate(['song-detail'])
  }
}
