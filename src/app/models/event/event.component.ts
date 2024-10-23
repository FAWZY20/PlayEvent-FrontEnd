import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Evenement } from 'src/app/dataModels/Evenement';
import { Musique } from 'src/app/dataModels/Musique';
import { EvenementService } from 'src/app/service/evenement.service';
import { SearchSongService } from 'src/app/service/search-song.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent {
  dateNow: Date = new Date()
  timeLeft: number = 180;
  interval: any;
  idEvent: any;
  evenement: Evenement;
  listMusique: Musique[] = []
  checkLike: boolean = false
  musiqueChoisit: any;
  musiqueChoisitError: boolean = false;
  timeLastSong: number = 5
  lyrics: any;

  constructor(
    private route: ActivatedRoute,
    private eventService: EvenementService,
    private searchSongService: SearchSongService
  ) {
    this.evenement = new Evenement()
    this.musiqueChoisit = new Musique()
  }

  ngOnInit() {
    this.startTimer();
    this.route.params.subscribe(params => {
      this.idEvent = params['idEvent'];
      this.eventService.getEventById(this.idEvent).subscribe(res => {
        this.evenement = res
        this.listMusique = res.playlist.musique
        this.listMusique.map(res => {
          res.like = 0
        })
      })
    });
  }

  getlyricSong(artist: string, son: string) {
    this.searchSongService.getSongText(artist, son).subscribe(res => {
      if (res) {
        this.lyrics = res.lyrics
      } else{
        this.lyrics = "le text du son n'existe pas"
      }
    })
  }

  checkMusiqueChoisit() {
    let note = 0
    const allLikesZero = this.listMusique.every((res: any) => res.like === 0);
    if (!allLikesZero) {
      this.musiqueChoisitError = false
      this.listMusique.forEach((res: any) => {
        if (res.like > note) {
          this.musiqueChoisit = res
          note = res.like
        }
      })
      this.getlyricSong(this.musiqueChoisit.artiste, this.musiqueChoisit.titre)
      this.startTimerSong()
    } else {
      this.musiqueChoisitError = true
    }
  }

  restarTimer() {
    this.timeLeft = 180
    this.startTimer()
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.interval);
        this.checkMusiqueChoisit()
      }
    }, 600);
  }

  startTimerSong() {
    this.interval = setInterval(() => {
      if (this.timeLastSong > 0) {
        this.timeLastSong--;
      } else {
        clearInterval(this.interval);
      }
    }, 600);
  }

  formatTimeLasstSong(): string {
    const minutes = Math.floor(this.timeLastSong / 60);
    const seconds = this.timeLastSong % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }


  formatTime(): string {
    const minutes = Math.floor(this.timeLeft / 60);
    const seconds = this.timeLeft % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  addLike(musique: any) {
    if (musique != null && this.checkLike == false) {
      musique.like = musique.like + 1
      this.checkLike = true
    }
  }

  choseNewSong() {
    this.musiqueChoisit = null

    this.timeLeft = 180
    this.startTimer()

    this.listMusique.map(res => res.like = 0)
    this.checkLike = false

    this.timeLastSong = 5
    
  }

}
