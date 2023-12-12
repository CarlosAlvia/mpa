import { Injectable } from '@angular/core';
import { Cancion } from '../interfaces/cancion';

@Injectable({
  providedIn: 'root'
})
export class ProcesadorDatosService {

  constructor() { }

  static compararPopularidad = (a:Cancion, b:Cancion) => {
    const popA = parseInt(a.popularity);
    const popB = parseInt(b.popularity);
    if(popA < popB){
      return 1;
    } else if(popA > popB){
      return -1;
    }else{
      return 0;
    }
  };

  private getArtistas(arr:Cancion[]){
    let artistas: string[] = [];
    arr.forEach((elemento: Cancion) => {
      let elementoArtista: string[] = elemento["artists"].split(","); 
      for(let i=0; i<elementoArtista.length; i++){
        if(!artistas.includes(elementoArtista[i].trim())){
          artistas.push(elementoArtista[i].trim());
        }
      }
    });
    return artistas;
  }

  private getCantidadCanciones(arr: Cancion[], artistas: string[]){
    let canciones: number[] = Array.from({length: artistas.length}, () => 0);
    arr.forEach((cancion:Cancion) =>{
      for(let i=0; i<artistas.length; i++){
        if(cancion["artists"].includes(artistas[i])){
          canciones[i] += 1;
        }
      }
    });
    return canciones;
  }

  getArtistasRecopilados(arr: Cancion[]){
    return this.getArtistas(arr).length;
  }

  getTempoPromedio(arr:Cancion[]){
    let sumatoria: number = 0;
    arr.forEach((elemento: Cancion) => {
      sumatoria += parseInt(elemento["tempo"]);
    });
    return (sumatoria/arr.length).toFixed(2);
  }

  getTiempoPromedio(arr:Cancion[]){
    let sumatoria: number = 0;
    arr.forEach((elemento: Cancion) =>{
      sumatoria += parseInt(elemento["duration_ms"]);
    });
    sumatoria = sumatoria/60000;
    return (sumatoria/arr.length).toFixed(2);
  }

  getArtistasConMasCanciones(arr:Cancion[]){
    let topArtistas: {top:number ,artista: string, canciones: number}[] = []; 
    let artistas: string[] = this.getArtistas(arr);
    let canciones: number[] = this.getCantidadCanciones(arr, artistas);

    let indicesOrdenados: number[] = canciones.map((_, indice) => indice);
    indicesOrdenados.sort((a,b) => canciones[b] - canciones[a]);

    let cancionesOrdenadas: number[] = indicesOrdenados.map(indice => canciones[indice]).slice(0, 10);
    let artistasOrdenados: string[] = indicesOrdenados.map(indice => artistas[indice]).slice(0,10);

    for(let i=0; i<cancionesOrdenadas.length;i++){
      let objeto = {
        top: i+1,
        artista: artistasOrdenados[i],
        canciones: cancionesOrdenadas[i]
      };

      topArtistas.push(objeto);
    }
    return topArtistas;
  }

  getTopPopularidad(arr:Cancion[]){
    return arr.slice().sort(ProcesadorDatosService.compararPopularidad).slice(0,10);
  }

}
