import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from  '@angular/common/http';

  //Importación de la interfaz
import { Cancion } from '../../interfaces/cancion';
import { SpotifySongsStatsService } from '../../providers/spotify-songs-stats.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [SpotifySongsStatsService],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {

  data: Cancion[] = [];
  constructor(private dataProvider: SpotifySongsStatsService){}
  ngOnInit(){
    this.dataProvider.getResponse().subscribe((response) => { 
      let dataArray = (response as Cancion[]); 
      this.data = dataArray.slice(0,20);
  })
}
}
