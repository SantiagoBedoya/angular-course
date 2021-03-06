import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { Label, MultiDataSet } from 'ng2-charts';
import { GraficasService } from '../../services/graficas.service';

@Component({
  selector: 'app-dona-http',
  templateUrl: './dona-http.component.html',
  styles: [],
})
export class DonaHttpComponent implements OnInit {

  public doughnutChartLabels: Label[] = [
    // 'Download Sales',
    // 'In-Store Sales',
    // 'Mail-Order Sales',
  ];
  public doughnutChartData: MultiDataSet = [
    // [350, 450, 100]
  ];
  public doughnutChartType: ChartType = 'doughnut';

  constructor(private graficasService: GraficasService) {}

  ngOnInit(): void {

    this.graficasService.getSocialNetworkUsersDonaData()
      .subscribe(({labels, values}) => {
        this.doughnutChartLabels = labels;
        this.doughnutChartData = values;
      });
  }
}
