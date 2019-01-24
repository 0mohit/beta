import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';

@IonicPage()
@Component({
  selector: 'page-summary-report',
  templateUrl: 'summary-report.html',
})
export class SummaryReportPage {
  @ViewChild('lineCanvas') lineCanvas;
  lineChart: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
  ) {
  }

  ionViewDidLoad() {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {

      type: 'line',
      data: {

        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        datasets: [
          {
            label: 'sahb',

            fill: false,
            usePointStyle: true,
            lineTension: 0.1,
            backgroundColor: "rgba(75,192,192,0.4)",
            borderColor: "rgba(75,192,192,1)",
            borderWidth: 0,
            borderHeight: 2,
            borderCapStyle: 'square',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'round',
            pointBorderColor: "rgba(75,192,192,1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(75,192,192,1)",
            pointHoverBorderColor: "rgba(220,220,220,1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [35, 30, 25, 20, 15, 10, 5, 0],
            spanGaps: false,
          }, {
            fill: false,
            lineTension: 0.1,
            borderWidth: 0,
            backgroundColor: "rgba(230, 126, 34, 1)",
            borderColor: "rgba(230, 126, 34, 1)",
            borderCapStyle: 'square',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'butt',
            pointBorderColor: "rgba(230, 126, 34, 1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(230, 126, 34, 1)",
            pointHoverBorderColor: "rgba(230, 126, 34, 1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [20.5, 21, 21.5, 22, 22.5, 23],
            spanGaps: false,
          }, {
            fill: false,
            lineTension: 0.1,
            borderWidth: 0,
            backgroundColor: "rgba(230, 126, 34, 1)",
            borderColor: "rgba(230, 126, 34, 1)",
            borderCapStyle: 'square',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'butt',
            pointBorderColor: "rgba(230, 126, 34, 1)",
            pointBackgroundColor: "#fff",
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: "rgba(230, 126, 34, 1)",
            pointHoverBorderColor: "rgba(230, 126, 34, 1)",
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9],

            spanGaps: false,
          }
        ]
      }, options: {
        responsive: true,
        title: {
          display: true,
          text: 'Parient Reading Trends',
          fontColor: 'white'
        },
        tooltips: {
          mode: 'label',
        },
        hover: {
          mode: 'nearest',
          intersect: false
        },
        layout: {
          padding: {
            left: -20,
            right: 10,
            top: 0,
            bottom: 0
          }
        },
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            fontColor: 'white'
          },

        },
        scales: {
          xAxes: [{
            display: true,
            gridLines: {
              display: false
            },
            scaleLabel: {
              display: false,
            }, ticks: {
              fontColor: "#CCC", // this here
            },
          }],
          yAxes: [{
            display: true,
            gridLines: {
              display: true,
              color: "#FFF"
            },
            scaleLabel: {
              display: true,
              fontSize: 15
            }, ticks: {
              beginAtZero: true,
              fontColor: "#CCC", // this here
            },
          }]
        }
      }
    });
  }
}
