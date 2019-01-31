import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Chart } from 'chart.js';
import { DbInitProvider } from './../../providers/db-init/db-init';

@IonicPage()
@Component({
  selector: 'page-summary-report',
  templateUrl: 'summary-report.html',
})
export class SummaryReportPage {
  @ViewChild('lineCanvas') lineCanvas;
  lineChart: any;
  location;
  moisture = [];
  temprature = [];
  pressure = [];
  option = {
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
      fullWidth: true,
      position: 'bottom',
      labels: {
        fontColor: 'white',
        padding: 20,
        fontSize: 7,
        width:10
      },

    },
    scales: {
      xAxes: [{
        display: true,
        gridLines: {
          display: false,
          drawTicks: false,
          drawBorder: false,
        },
        scaleLabel: {
          display: false,
        }, ticks: {
          fontColor: "#CCC", // this here
          // padding:10
        },
      }],
      yAxes: [{
        labelAutoFit: true,
        display: true,
        gridLines: {
          display: true,
          color: "whitesmoke",
          drawTicks: false,
          drawBorder: false,
          lineWidth: 0.5,
        },
        scaleLabel: {
          display: true,
          fontSize: 17,
        }, ticks: {
          autoSkip: true,
          beginAtZero: true,
          fontColor: "#CCC", // this here
          max: 35,
          min: 0,
          // stepSize: 5,
          length: 2,
          padding: 10,
          //   callback: function(value, index, values) {
          //     return value;
          // }
        },

      }]
    }
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public _db: DbInitProvider
  ) {
  }

  ngOnInit() {
    if (localStorage.getItem('userData')) {
      this.location = JSON.parse(localStorage.getItem('userData'));
    }
    console.log("location", this.location)
  }

  initGraph() {
    let query = `SELECT * FROM SensorReadings WHERE UserId=${this.location['UserId']} AND DeviceId='${this.location['DeviceId']}' AND CreatedTime > 'DATE_SUB(curdate(), INTERVAL 6 DAY)'`
    console.log("query", query)
    this._db.executeQuery(query).then((res: any) => {
      for (let i = 0; i < res.rows.length; i++) {
        console.log("res******", res.rows.item(i))
        let data = res.rows.item(i);
        this.temprature.push(data['Temperature']);
        this.moisture.push(data['Moisture']);
        this.pressure.push(data['Pressure']);
      }

      console.log("sensor", this.moisture, this.temprature, this.pressure);
      this.createDataForGraph();
    }).catch(e => {
      console.log("err***************", e)
    })
  }

  createDataForGraph() {
    let commanData = {
      lineTension: 0.5,
      usePointStyle: true,
      borderWidth: 0,
      borderHeight: 2,
      borderCapStyle: 'square',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'round',
      pointBackgroundStyle: '',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      pointBackgroundColor: "#fff",
      spanGaps: false,
      fill: false,
      pointStyle: 'rect',
      pointBorderColor: '#fff',
    }
    let temprature = {
      label: 'Tempetature',
      borderColor: "rgba(75,192,192,1)",
      pointBorderColor: "rgba(75,192,192,1)",
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      data: this.temprature,
    }
    temprature = Object.assign(temprature, commanData)
    let moisture = {
      label: 'Moisture %RH',
      backgroundColor: "rgba(230, 126, 34, 1)",
      borderColor: "rgba(230, 126, 34, 1)",
      pointHoverBackgroundColor: "rgba(230, 126, 34, 1)",
      pointHoverBorderColor: "rgba(230, 126, 34, 1)",
      data: this.moisture,
    }
    moisture = Object.assign(moisture, commanData)

    let Pressure = {
      label: 'Force/Pressure mmHg',
      backgroundColor: "rgba(230, 126, 34, 1)",
      borderColor: "rgba(230, 126, 34, 1)",
      pointBorderColor: "rgba(230, 126, 34, 1)",
      pointBackgroundColor: "#fff",
      pointHoverBackgroundColor: "rgba(230, 126, 34, 1)",
      pointHoverBorderColor: "rgba(230, 126, 34, 1)",
      data: this.pressure,
    };
    Pressure = Object.assign(Pressure, commanData);

    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        datasets: [
          temprature, moisture, Pressure
        ]
      }, options: this.option
    });
  }

  ionViewDidLoad() {
    this.initGraph();
  }
}
