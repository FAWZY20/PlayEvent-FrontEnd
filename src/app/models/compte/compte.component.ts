import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Utilisateur } from 'src/app/dataModels/utilisateur';
import { UtilisateurService } from 'src/app/service/utilisateur.service';

@Component({
  selector: 'app-compte',
  templateUrl: './compte.component.html',
  styleUrls: ['./compte.component.css']
})
export class CompteComponent {
  checkItem: any;
  listUtilisateur: Utilisateur[] = [];
  listUtilisateurSelect: Utilisateur[] = []
  action: string = "Actions groupées";
  errorAction: boolean = false;
  role: string = "Changer de role pour ..";

  constructor(
    private utilisateurService: UtilisateurService,
    private route: Router
  ) { }

  newCompte() {
    this.route.navigate(['/admin/compte/newCompte']);
  }

  actionUser(action: string) {
    if (action = "DELETE") {
      this.listUtilisateurSelect.forEach(res => {
        if (res.role !== "ADMIN") {
          this.utilisateurService.deleteUser(res.id)
        } else {
          this.errorAction = true
        }
      })
    }
  }

  updateRole(role: string) {
    this.listUtilisateurSelect.forEach(res => {
      this.utilisateurService.updateRole(res.id, role)
    })
  }

  checkAll() {
    this.listUtilisateur.forEach(res => {
      if (res.selected != true) {
        res.selected = true
        this.listUtilisateurSelect.push(res)
      } else {
        res.selected = false
      }
    })
  }

  addList(utilisateur: Utilisateur) {
    const checkUtilisateur = this.listUtilisateurSelect.find((res: any) => res == utilisateur.id)
    if (utilisateur.selected) {
      if (!checkUtilisateur) {
        this.listUtilisateurSelect.push(utilisateur)
      }
    } else {
      this.listUtilisateurSelect = this.listUtilisateurSelect.filter((res: any) => res !== utilisateur.id)
    }
  }


  ngOnInit() {
    this.utilisateurService.findallUser().subscribe(res => {
      this.listUtilisateur = res
    })
  }

}
