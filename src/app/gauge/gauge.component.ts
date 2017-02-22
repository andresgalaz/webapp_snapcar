import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-gauge',
    templateUrl: './gauge.component.html',
    styleUrls: ['./gauge.component.scss']
})

export class GaugeComponent implements OnInit {
    chartColors: any;
    chartDataSets: any[];
    chartOptions: any;
    chartType: string;
    scoreNumber: number;
    scoreText: string;

    constructor() {
        this.chartDataSets = [{
            data: [80, 20],
            backgroundColor: [
                "#36A2EB",
                "#000E22"
            ],
            borderWidth: 0
        }];
        this.chartType = 'doughnut';
        this.chartColors = [{
            borderColor: '#72ff3e'
        }];
        this.chartOptions = {
            cutoutPercentage: 92,
            tooltips: {
                callbacks: {
                    label: function (tooltipItem) {
                        return tooltipItem.yLabel;
                    }
                }
            },
            responsive: false,
            rotation: -1 * Math.PI
        };
        this.scoreNumber = 80;
        this.scoreText = 'tu score';
    }

    ngOnInit() {
    }

}
