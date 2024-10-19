import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Evenement } from 'src/app/dataModels/Evenement';
import { Musique } from 'src/app/dataModels/Musique';
import { EvenementService } from 'src/app/service/evenement.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent {
  timeLeft: number = 300;
  interval: any;
  idEvent: any;
  evenement: Evenement;
  listMusique: Musique[] = []
  checkLike: boolean = false

  constructor(
    private route: ActivatedRoute,
    private eventService: EvenementService
  ) { this.evenement = new Evenement() }

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

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.interval);
      }
    }, 1000);
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
}
