import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Playlist } from 'src/app/dataModels/Playlist';
import { PlaylistService } from 'src/app/service/playlist.service';

@Component({
  selector: 'app-playlist',
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent {
  listPlaylist: Playlist[] = []
  p: number = 1;
  
  constructor(
    private route: Router,
    private playlistService: PlaylistService
  ) {
  }

  newPlaylist() {
    this.route.navigate(['/admin/playlist/newPlaylist']);
  }

  ngOnInit() {
    this.playlistService.getAllPlaylist().subscribe(res => {
      this.listPlaylist = res
    })
  }

}
