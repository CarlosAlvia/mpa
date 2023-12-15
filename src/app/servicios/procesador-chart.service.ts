import { Injectable } from '@angular/core';
import { Cancion } from '../interfaces/cancion';

@Injectable({
  providedIn: 'root'
})
export class ProcesadorChartService {

  dataArray:Cancion[];

  constructor() { 
    this.dataArray = [];
  }

  setDataArray(arr:Cancion[]){
    this.dataArray = arr;
  }

  private getPromedioAtributo(atributo:keyof Cancion){
    let sumatoria:number = 0;
    this.dataArray.forEach((cancion:Cancion) =>{
      const valor: number = parseFloat(cancion[atributo]);
      sumatoria += valor;
    });
    return (sumatoria/this.dataArray.length);
  }

  private processDataRadar(){
    let arrCarac: number[] = [
      this.getPromedioAtributo("acousticness"),
      this.getPromedioAtributo("energy"),
      this.getPromedioAtributo("danceability"),
      this.getPromedioAtributo("instrumentalness")
    ];
    return arrCarac;
  }

  public getDataRadarChart(){
    const data = {
      labels: [
        "Acústico",
        "Energético",
        "Bailable",
        "Sin instrumentación"
      ],
      datasets:[{
        label:"Características de las Canciones",
        data: this.processDataRadar(),
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
      }]
    };

    return data;
  }

  public getDataBarChart(){
    const data = {
      labels:[
        "Explícitas",
        "No Explícitas"
      ],
      datasets:[{
        label: "Explícitas vs No Explícitas",
        data:[
          this.dataArray.filter(cancion => cancion.is_explicit === "True").length,
          this.dataArray.filter(cancion => cancion.is_explicit !== "True").length,
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

  private getPairDataScatter(){
    let data: {x: number, y: number}[] = [];
    this.dataArray.forEach(cancion => {
      let xy = {
        x: parseFloat(cancion.valence),
        y: parseFloat(cancion.energy)
      }
      data.push(xy);
    });
    return data;
  }

  public getScatterData(){
    const data = {
      datasets: [{
        label: "Valence vs Energy",
        data: this.getPairDataScatter(),
        backgroundColor: 'rgb(255, 99, 132)'
      }]
    };

    return data;
  }

  private getBubbleData() {
    const data:{}[] = [];
    this.dataArray.forEach(cancion =>{
      let x = {
        x: parseFloat(cancion.acousticness),
        y: parseFloat(cancion.energy),
        r: parseFloat(cancion.instrumentalness)
      };
      data.push(x);
    });
    return data;
  }

  public getDataSongsBarChart(){
    let labels: string[] = this.dataArray.map(cancion => cancion.name);
    const data = {
      labels: labels,
      datasets:[{
        label: "Acousticness vs Energía vs Instrumentación",
        data: this.getBubbleData(),
        backgroundColor: 'rgb(255, 99, 132)'
      }]
    } 
    return data;
  }

}
