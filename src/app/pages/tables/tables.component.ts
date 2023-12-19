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
  top10Bailables:Cancion[]=[];
  top10Movidas:Cancion[]=[];
  seleccionadorExplicitas:string='';
  seleccionadorViveza:string='';
  constructor(private dataProvider: SpotifySongsStatsService, private procesador: ProcesadorDatosService){

  }
  ngOnInit(){
    this.dataProvider.getResponse().subscribe((response) => {
      let dataArray = (response as Cancion[]);
      this.procesador.setDataArray(dataArray);
      this.top10Explicitas=this.procesador.getTop10Explicitas();
      this.top10NoExplicitas=this.procesador.getTop10NoExplicitas();
      this.top10Bailables=this.procesador.getTop10Bailables();
      this.top10Movidas=this.procesador.getTop10Movidas();
      this.seleccionadorExplicitas="Explicitas";
      this.seleccionadorViveza="Bailables";
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

  seleccionarTipo2(tipo: string){
    let tablaBailables = document.getElementById('top10bailables');
    let tablaMovidas = document.getElementById('top10movidas');
    let title = document.getElementById('cardTitleViveza');
    this.seleccionadorViveza = tipo;
    if(this.seleccionadorViveza=="Bailables" && tablaBailables && tablaMovidas && title){
      try {
        tablaBailables.classList.remove('noMostrar');
        tablaMovidas.classList.add('noMostrar');
        title.textContent="Top 10 Canciones Más Bailables";
      } catch (error) {
        
      }
    }else if(this.seleccionadorViveza=="Movidas" && tablaBailables && tablaMovidas && title){
      try {
        tablaBailables.classList.add('noMostrar');
        tablaMovidas.classList.remove('noMostrar');
        title.textContent="Top 10 Canciones Más Movidas";
      } catch (error) {
        
      }
    }
  }
}
