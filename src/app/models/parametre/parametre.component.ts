import { Component } from '@angular/core';
import { Utilisateur } from 'src/app/dataModels/utilisateur';
import { UtilisateurService } from 'src/app/service/utilisateur.service';

@Component({
  selector: 'app-parametre',
  templateUrl: './parametre.component.html',
  styleUrls: ['./parametre.component.css']
})
export class ParametreComponent {
  showInput: boolean = false
  newPwd: string = "";
  mailExist: any;
  utilisateur: Utilisateur
  constructor(
    private utilisateurService: UtilisateurService

  ) { this.utilisateur = new Utilisateur() }

  setPwd() {
    if (this.showInput == false) {
      this.showInput = true
    } else {
      this.showInput = false
    }
  }

  ngOnInit(): void {
    this.utilisateurService.decodeToken().subscribe(decodedData => {
      if (decodedData) {
        this.utilisateur = decodedData
      }
    })
  }

  onSubmit() {
    this.utilisateurService.findUserByuserId(this.utilisateur.id).subscribe(res => {
      if (res == null || res.mail == this.utilisateur.mail) {
        this.utilisateur.pwd = this.newPwd
        this.utilisateurService.updateUser(this.utilisateur)
        this.mailExist = false
      } else {
        this.mailExist = true
      }
    })
  }

}
