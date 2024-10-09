import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Utilisateur } from 'src/app/dataModels/utilisateur';
import { UtilisateurService } from 'src/app/service/utilisateur.service';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.css']
})
export class FormUserComponent {
  utilisateur: Utilisateur
  mailExist: boolean = false

  constructor(
    private utilisateurService: UtilisateurService,
    private route: Router
  ) { this.utilisateur = new Utilisateur() }


  onSubmit(): any {
    this.utilisateurService.findUserByMail(this.utilisateur.mail).subscribe(res => {
      if (res == null) {
        this.utilisateurService.addUser(this.utilisateur).subscribe((() => {
          this.route.navigate(['/admin/compte'])
        }))
      } else {
        this.mailExist = true
      }
    })

  }

}
