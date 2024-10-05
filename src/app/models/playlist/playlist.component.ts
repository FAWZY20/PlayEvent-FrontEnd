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
  isLoading: boolean = true;
  p: number = 1;

  constructor(
    private route: Router,
    private playlistService: PlaylistService
  ) {
  }

  newPlaylist() {
    this.route.navigate(['/admin/playlist/newPlaylist']);
  }

  deletePlaylist(playlistNom: string) {
    this.playlistService.deletePlaylist(playlistNom)
  }

  updatePlaylist(playlistId: string) {
    this.playlistService.getPlaylistById(playlistId).subscribe(res => {
      localStorage.setItem("playlist", JSON.stringify(res))
      this.route.navigate(['/admin/playlist/updatePlaylist']);
    })
  }

  ngOnInit() {
    this.playlistService.getAllPlaylist().subscribe(res => {
      this.listPlaylist = res
    })
  }

}
