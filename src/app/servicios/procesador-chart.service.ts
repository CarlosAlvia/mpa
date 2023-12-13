import { Injectable } from '@angular/core';
import { Cancion } from '../interfaces/cancion';

@Injectable({
  providedIn: 'root'
})
export class ProcesadorChartService {

  constructor() { }

  private getPromedioAtributo(arr:Cancion[], atributo:keyof Cancion){
    let sumatoria:number = 0;
    arr.forEach((cancion:Cancion) =>{
      const valor: number = parseFloat(cancion[atributo]);
      sumatoria += valor;
    });
    return (sumatoria/arr.length);
  }

  private processDataRadar(arr: Cancion[]){
    let arrCarac: number[] = [
      this.getPromedioAtributo(arr, "acousticness"),
      this.getPromedioAtributo(arr, "energy"),
      this.getPromedioAtributo(arr, "danceability"),
      this.getPromedioAtributo(arr, "instrumentalness")
    ];
    return arrCarac;
  }

  public getDataRadarChart(arr: Cancion[]){
    const data = {
      labels: [
        "Acústico",
        "Energético",
        "Bailable",
        "Sin instrumentación"
      ],
      datasets:[{
        label:"Características de las Canciones",
        data: this.processDataRadar(arr),
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
      }]
    };

    return data;
  }

  public getDataBarChart(arr: Cancion[]){
    const data = {
      labels:[
        "Explícitas",
        "No Explícitas"
      ],
      datasets:[{
        label: "Explícitas vs No Explícitas",
        data:[
          arr.filter(cancion => cancion.is_explicit === "True").length,
          arr.filter(cancion => cancion.is_explicit !== "True").length,
        ],
        fill:true,
        backgroundColor:[
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
        ],
        borderWidth: 1
      }]
    }
    return data
  }

}
