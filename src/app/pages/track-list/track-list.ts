import {Component, OnInit, inject, signal} from '@angular/core'
import {DecimalPipe} from '@angular/common'
import {FormControl, ReactiveFormsModule} from '@angular/forms'
import {MatButtonModule} from '@angular/material/button'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatIconModule} from '@angular/material/icon'
import {MatInputModule} from '@angular/material/input'
import {MatTableModule} from '@angular/material/table'
import {startWith} from 'rxjs/operators'
import {Track} from '../../models/track'
import {TrackApiService} from '../../services/track-api'

@Component({
  selector: 'app-track-list',
  imports: [
    DecimalPipe,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
  ],
  templateUrl: './track-list.html',
  styleUrl: './track-list.css',
  standalone: true
})
export class TrackList implements OnInit {
  api = inject(TrackApiService)

  readonly displayedColumns = ['title', 'artist', 'album', 'genre', 'duration', 'plays', 'play']
  readonly tracks = signal<Track[]>([])
  readonly loading = signal(true)
  readonly searchControl = new FormControl('')

  ngOnInit() {
    this.api.search(
      this.searchControl
        .valueChanges
        .pipe(startWith(''))
    )
      .subscribe((tracks) => {
        this.tracks.set(tracks)
        this.loading.set(false)
      })
  }

  play(track: Track) {
    this.api.incrementPlay(track._id).subscribe((updated) => {
      this.tracks.update((list) => list.map((t) => (t._id === updated._id ? updated : t)))
    })
  }

  formatDuration(sec: number): string {
    const m = Math.floor(sec / 60)
    const s = sec % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  totalPlays(): number {
    return this.tracks().reduce((sum, t) => sum + t.playCount, 0)
  }
}
