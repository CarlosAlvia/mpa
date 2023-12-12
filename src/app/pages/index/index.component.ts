import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from  '@angular/common/http';

  //Importación de la interfaz
import { Cancion } from '../../interfaces/cancion';
import { SpotifySongsStatsService } from '../../providers/spotify-songs-stats.service';
import { ProcesadorDatosService } from '../../servicios/procesador-datos.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  providers: [SpotifySongsStatsService],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {

  artistasRecopilados: number = 0;
  bpmPromedio: string = "0"; //RARO ESTO, FIXEDTO te da un String
  tiempoPromedio: string = "0";
  topArtistas: {top:number, artista: string, canciones:number}[] = [];
  dataPopularidad: Cancion[] = [];

  constructor(private dataProvider: SpotifySongsStatsService, private procesador: ProcesadorDatosService){}
  ngOnInit(){
    this.dataProvider.getResponse().subscribe((response) => { 
      let dataArray = (response as Cancion[]); 
      //dataArray = dataArray.filter(objeto => objeto.spotify_id != "3rUGC1vUpkDG9CZFHMur1t");
      this.artistasRecopilados = this.procesador.getArtistasRecopilados(dataArray);
      this.bpmPromedio = this.procesador.getTempoPromedio(dataArray);
      this.tiempoPromedio = this.procesador.getTiempoPromedio(dataArray);
      this.topArtistas = this.procesador.getArtistasConMasCanciones(dataArray);
      this.dataPopularidad = this.procesador.getTopPopularidad(dataArray);
  })
}
}
