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
  @ViewChild('DispersionEnergiaVSValence', { static: false }) ValenceVSEnergy!: ElementRef;
  @ViewChild('HistogramaPopularidad', { static: false }) HistogramaPopularidad!: ElementRef;

  constructor(private dataProvider: SpotifySongsStatsService, private chartMaker: ProcesadorChartService){}
  ngOnInit(){
    this.dataProvider.getResponse().subscribe((response) => {
      let dataArray = (response as Cancion[]);
      this.chartMaker.setDataArray(dataArray);
      this.makeRadarChart();
      this.makeBarChart();
      this.makeScatterChart();
      this.makePopularityChart();
    });
  }

  makeRadarChart(){
    const ref = this.CaracteristicasRadar.nativeElement;
    const data = this.chartMaker.getDataRadarChart();
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

  makeBarChart(){
    const ref = this.Explicit.nativeElement;
    const data = this.chartMaker.getDataBarChart();
    new Chart(ref, {
      type: "bar",
      data: data
    });
  }

  makeScatterChart(){
    const ref = this.ValenceVSEnergy.nativeElement;
    const data = this.chartMaker.getScatterData();
    new Chart(ref, {
      type: "scatter",
      data: data
    });
  }

  makePopularityChart(){
    const ref = this.HistogramaPopularidad.nativeElement;
    const data = this.chartMaker.getDataSongsBarChart();
    new Chart(ref, {
      type: "bubble",
      data: data
    });
  }

}
