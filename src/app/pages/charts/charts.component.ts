import { Component,ViewChild, ElementRef} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from  '@angular/common/http';

import { Cancion } from '../../interfaces/cancion';
import { SpotifySongsStatsService } from '../../providers/spotify-songs-stats.service';
import { ProcesadorChartService } from '../../servicios/procesador-chart.service';
import { Chart } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-charts',
  standalone: true, 
  imports: [CommonModule, HttpClientModule, NgChartsModule],
  providers: [SpotifySongsStatsService],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.css'
})
export class ChartsComponent {

  @ViewChild('CaracteristicasRadar', { static: false }) CaracteristicasRadar!: ElementRef;
  @ViewChild('Explicit', { static: false }) Explicit!: ElementRef;

  constructor(private dataProvider: SpotifySongsStatsService, private chartMaker: ProcesadorChartService){}
  ngOnInit(){
    this.dataProvider.getResponse().subscribe((response) => {
      let dataArray = (response as Cancion[]);
      console.log(dataArray.length);
      this.makeRadarChart(dataArray);
      this.makeBarChart(dataArray);
    });
  }

  makeRadarChart(arr:Cancion[]){
    const ref = this.CaracteristicasRadar.nativeElement;
    const data = this.chartMaker.getDataRadarChart(arr);
    const options = {
      elements: {
        line: {
          borderWidth: 3
        }
      }
    }
    new Chart(ref, {
      type: "radar",
      data: data,
      options: options
    });
  }

  makeBarChart(arr:Cancion[]){
    const ref = this.Explicit.nativeElement;
    const data = this.chartMaker.getDataBarChart(arr);
    new Chart(ref, {
      type: "bar",
      data: data
    });
  }

}
