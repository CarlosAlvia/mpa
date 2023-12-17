import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from  '@angular/common/http';

import { Cancion } from '../../interfaces/cancion';
import { SpotifySongsStatsService } from '../../providers/spotify-songs-stats.service';
import { ProcesadorDatosService } from '../../servicios/procesador-datos.service';
@Component({
  selector: 'app-tables',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  providers: [SpotifySongsStatsService],
  templateUrl: './tables.component.html',
  styleUrl: './tables.component.css'
})
export class TablesComponent {
  top10Explicitas:Cancion[]=[];
  top10NoExplicitas:Cancion[]=[];
  seleccionadorExplicitas:string='';
  constructor(private dataProvider: SpotifySongsStatsService, private procesador: ProcesadorDatosService){

  }
  ngOnInit(){
    this.dataProvider.getResponse().subscribe((response) => {
      let dataArray = (response as Cancion[]);
      this.procesador.setDataArray(dataArray);
      this.top10Explicitas=this.procesador.getTop10Explicitas();
      this.top10NoExplicitas=this.procesador.getTop10NoExplicitas();
      this.seleccionadorExplicitas="Explicitas";
    });
  }

  seleccionarTipo(tipo: string) {
    let tablaExplicitas = document.getElementById('top10explicitas');
    let tablaNoExplicitas = document.getElementById('top10noexplicitas');
    let title = document.getElementById('cardTitleExplicitud');
    this.seleccionadorExplicitas = tipo;
    if(this.seleccionadorExplicitas=="Explícitas" && tablaExplicitas && tablaNoExplicitas && title){
      try {
        tablaExplicitas.classList.remove('noMostrar');
        tablaNoExplicitas.classList.add('noMostrar');
        title.textContent="Top 10 Canciones Explícitas Más Populares";
      } catch (error) {
        
      }
    }else if(this.seleccionadorExplicitas=="No Explícitas" && tablaExplicitas && tablaNoExplicitas && title){
      try {
        tablaExplicitas.classList.add('noMostrar');
        tablaNoExplicitas.classList.remove('noMostrar');
        title.textContent="Top 10 Canciones No Explícitas Más Populares";
      } catch (error) {
        
      }
    }
  }
}
