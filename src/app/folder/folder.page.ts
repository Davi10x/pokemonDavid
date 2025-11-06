import { Component, inject, OnInit } from '@angular/or<ion-card *ngIf="pokemon">
      <ion-card-header>
        <ion-card-title class="ion-text-capitalize">{{ pokemon.name }}</ion-card-title>
        <ion-button (click)="clearPokemon()" slot="end">Close</ion-button>
      </ion-card-header>

      <ion-img [src]="pokemon.sprites.other['official-artwork'].front_default"></ion-img>

      <ion-card-content>
        <div class="types-container">
          <strong>Types:</strong>
          <ion-chip *ngFor="let typeInfo of pokemon.types">
            <ion-label>{{ typeInfo.type.name }}</ion-label>
          </ion-chip>
        </div>

        <div class="stats-container">
          <strong>Base Stats:</strong>
          <div *ngFor="let stat of pokemon.stats" class="stat-item">
            <span class="stat-name">{{ stat.stat.name }}: {{ stat.base_stat }}</span>
            <ion-progress-bar [value]="stat.base_stat / 255"></ion-progress-bar>
          </div>
        </div>

        <p><strong>Height:</strong> {{ pokemon.height }}</p>
        <p><strong>Weight:</strong> {{ pokemon.weight }}</p>
        <p><strong>Base Experience:</strong> {{ pokemon.base_experience }}</p>

        <strong>Abilities:</strong>
        <ul>
          <li *ngFor="let ability of pokemon.abilities">
            {{ ability.ability.name }}
          </li>
        </ul>
      </ion-card-content>
    </ion-card>e';
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

  constructor() {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id') as string;
  }

  searchPokemon(name: string) {
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
