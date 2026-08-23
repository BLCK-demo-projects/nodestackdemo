import { HttpClient } from '@angular/common/http'
import { Injectable, inject } from '@angular/core'
import { Observable } from 'rxjs'
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
} from 'rxjs/operators'
import { Track } from '../models/track'

@Injectable({ providedIn: 'root' })
export class TrackApiService {
  private readonly http = inject(HttpClient)

  search(termChanges: Observable<string | null>): Observable<Track[]> {
    return termChanges.pipe(
      debounceTime(100),
      distinctUntilChanged(),
      switchMap((term) =>
        this.http.get<Track[]>('/api/tracks', {
          params: term ? { search: term } : {},
        }),
      ),
    )
  }

  incrementPlay(id: string): Observable<Track> {
    return this.http.post<Track>(`/api/tracks/${id}/play`, {})
  }

  saveSong(track: Track) {
    return this.http.post<Track>('/api/tracks', track)
  }
}
