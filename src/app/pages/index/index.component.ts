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
  bpmPromedio: string = "0"; 
  tiempoPromedio: string = "0";
  topArtistas: {top:number, artista: string, canciones:number}[] = [];
  dataPopularidad: Cancion[] = [];
  dataCancionesArtista: Cancion[] = [];

  constructor(private dataProvider: SpotifySongsStatsService, private procesador: ProcesadorDatosService){}
  ngOnInit(){
    this.dataProvider.getResponse().subscribe((response)=> { 
      let dataArray = (response as Cancion[]);
      this.procesador.setDataArray(dataArray); 
      this.bpmPromedio = this.procesador.getTempoPromedio();
      this.tiempoPromedio = this.procesador.getTiempoPromedio();
      const x = this.procesador.getArtistasConMasCanciones();
      this.topArtistas = x[0];
      this.artistasRecopilados = x[1];
      this.dataPopularidad = this.procesador.getTopPopularidad();
      this.dataCancionesArtista = this.procesador.getCancionesArtistaTop(this.topArtistas[0].artista);
      
  })
}
}
