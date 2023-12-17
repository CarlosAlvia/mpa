import { Injectable } from '@angular/core';
import { Cancion } from '../interfaces/cancion';

@Injectable({
  providedIn: 'root'
})
export class ProcesadorDatosService {

  dataArray:Cancion[];

  constructor() { 
    this.dataArray = [];
  }

  public setDataArray(arr:Cancion[]){
    this.dataArray = arr;
  }

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

  private getArtistas(){
    let artistas: string[] = [];
    this.dataArray.forEach((elemento: Cancion) => {
      let elementoArtista: string[] = elemento["artists"].split(","); 
      for(let i=0; i<elementoArtista.length; i++){
        if(!artistas.includes(elementoArtista[i].trim())){
          artistas.push(elementoArtista[i].trim());
        }
      }
    });
    return artistas;
  }

  private getCantidadCanciones(artistas: string[]){
    let canciones: number[] = Array.from({length: artistas.length}, () => 0);
    this.dataArray.forEach((cancion:Cancion) =>{
      for(let i=0; i<artistas.length; i++){
        let x: string[] = cancion.artists.split(",");
        x = x.map(song => song.trim());
        if(x.includes(artistas[i])){
          canciones[i] += 1;
        }
      }
    });
    return canciones;
  }


  getTempoPromedio(){
    let sumatoria: number = 0;
    this.dataArray.forEach((elemento: Cancion) => {
      sumatoria += parseInt(elemento["tempo"]);
    });
    return (sumatoria/this.dataArray.length).toFixed(2);
  }

  getTiempoPromedio(){
    let sumatoria: number = 0;
    this.dataArray.forEach((elemento: Cancion) =>{
      sumatoria += parseInt(elemento["duration_ms"]);
    });
    sumatoria = sumatoria/60000;
    return (sumatoria/this.dataArray.length).toFixed(2);
  }

  getArtistasConMasCanciones(){
    const finalData: any[] = [];
    let topArtistas: {top:number ,artista: string, canciones: number}[] = []; 
    let artistas: string[] = this.getArtistas();
    let canciones: number[] = this.getCantidadCanciones(artistas);

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
    finalData.push(topArtistas);
    finalData.push(artistas.length);
    return finalData;
  }

  getTopPopularidad(){
    return this.dataArray.slice().sort(ProcesadorDatosService.compararPopularidad).slice(0,10);
  }

  getCancionesArtistaTop(artista:string){
    let arrArtista:Cancion[] = this.dataArray.filter(cancion => cancion.artists.includes(artista));
    return arrArtista.sort(ProcesadorDatosService.compararPopularidad).slice(0,5);
  }

  getTop10Explicitas(){
    let arrOrdenado:Cancion[] = this.dataArray.slice().sort(ProcesadorDatosService.compararPopularidad);
    let arrRetorno:Cancion[] = []
    let i = 0;
    while(i<arrOrdenado.length && arrRetorno.length<10){
      if(arrOrdenado[i].is_explicit=="True"){
        arrRetorno.push(arrOrdenado[i]);
      }
      i++;
    }
    return arrRetorno;
  }
  getTop10NoExplicitas(){
    let arrOrdenado:Cancion[] = this.dataArray.slice().sort(ProcesadorDatosService.compararPopularidad);
    let arrRetorno:Cancion[] = []
    let i = 0;
    while(i<arrOrdenado.length && arrRetorno.length<10){
      if(arrOrdenado[i].is_explicit=="False"){
        arrRetorno.push(arrOrdenado[i]);
      }
      i++;
    }
    return arrRetorno;
  }
}
