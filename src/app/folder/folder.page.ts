import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonSearchbar, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg, IonIcon, IonChip, IonLabel, IonProgressBar } from '@ionic/angular/standalone';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonContent, IonSearchbar, IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonImg, CommonModule, IonIcon, IonChip, IonLabel, IonProgressBar],
})
export class FolderPage implements OnInit {
  public folder!: string;
  private activatedRoute = inject(ActivatedRoute);
  private http = inject(HttpClient);
  public pokemon: any = null;
  public randomPokemon: any = null;

  constructor() {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
    this.loadRandomPokemon();
  }

  loadRandomPokemon() {
    const randomId = Math.floor(Math.random() * 1000) + 1;
    this.http.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`).subscribe((res: any) => {
      this.randomPokemon = res;
    });
  }

  searchPokemon(name: string) {
    if (!name) {
      this.clearPokemon();
      return;
    }
    this.http.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)
      .subscribe(
        (res) => {
          this.pokemon = res;
        },
        (err) => {
          this.pokemon = null;
          console.error('Pokemon not found', err);
        }
      );
  }

  clearPokemon() {
    this.pokemon = null;
  }
}
