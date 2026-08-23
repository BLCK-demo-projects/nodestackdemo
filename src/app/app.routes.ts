import { Routes } from '@angular/router'
import { TrackList } from './pages/track-list/track-list'
import {SongDetail} from './pages/song-detail/song-detail';

export const routes: Routes = [
  {
    path: '',
    component: TrackList,
  },
  {
    path: 'song-detail',
    component: SongDetail,
  }
]
