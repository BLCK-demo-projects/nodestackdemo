import { Component, inject, signal } from '@angular/core'
import {FormField, form, required, min, maxLength} from '@angular/forms/signals'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import {ActivatedRoute, Router} from '@angular/router'
import { Track } from '../../models/track'
import {TrackApiService} from '../../services/track-api';

@Component({
  selector: 'app-song-detail',
  imports: [FormField, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './song-detail.html',
  styleUrls: ['./song-detail.css','../../app.css'],
})
export class SongDetail {
  route = inject(ActivatedRoute)
  router = inject(Router)
  api = inject(TrackApiService)

  readonly isEdit = this.route.snapshot.paramMap.has('id')

  songModel = signal<Track>({
    _id: '',
    title: '',
    artist: '',
    album: '',
    genre: '',
    durationSec: 0,
    playCount: 0,
  })

  songForm = form(this.songModel, (schemaPath) => {
    required(schemaPath.title);
    maxLength(schemaPath.title, 35)
    required(schemaPath.artist);
    required(schemaPath.album);
    required(schemaPath.genre);
    required(schemaPath.durationSec);
    min(schemaPath.durationSec, 10);
  });

  async onSave() {
    this.api.saveSong(this.songModel()).subscribe()
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
