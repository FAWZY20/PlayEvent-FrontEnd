import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Evenement } from 'src/app/dataModels/Evenement';
import { EvenementService } from 'src/app/service/evenement.service';

@Component({
  selector: 'app-evenement',
  templateUrl: './evenement.component.html',
  styleUrls: ['./evenement.component.css']
})
export class EvenementComponent {
  p: number = 1;
  listEvent: any[] = []

  constructor(
    private route: Router,
    private evenementService: EvenementService
  ) { }

  deleteEvent(eventId: any) {
    this.evenementService.deleteEvent(eventId)
  }
  
  updateEvent(eventId: any) {
    this.evenementService.getEventById(eventId).subscribe(res => {
      localStorage.setItem("Evenement", JSON.stringify(res))
      this.route.navigate(['/admin/evenement/updateEvenement']);
    })
  }

  newEvent() {
    this.route.navigate(['/admin/evenement/newEvent']);
  }

  ngOnInit() {
    this.evenementService.getAllEvent().subscribe(res => {
      this.listEvent = res
    })
  }

}
