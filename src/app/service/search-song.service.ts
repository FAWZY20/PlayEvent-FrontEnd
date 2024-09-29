import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchSongService {
  songUrl: string;

  constructor(
    private http: HttpClient
  ) {
    this.songUrl = "https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q="
  }

  searchSong(search: string): Observable<any> {
    return this.http.get(this.songUrl + search)
  }
}
