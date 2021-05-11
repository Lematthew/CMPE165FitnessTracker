import React, { Component } from "react"
import Chart from 'chart.js/auto'
let myChart;

class LineGraph extends Component {
    constructor(props) {
        super(props);;
    }

    componentDidUpdate() {
        myChart.data.labels = this.props.activityData.map(d => d.time);
        myChart.data.datasets[0].data = this.props.activityData.map(d => d.value);
        myChart.data.datasets[1].data = this.props.goalsData.map(d => d.value);
        myChart.update();
    }

    componentDidMount() {
        if (typeof myChart !== "undefined") myChart.destroy();

        myChart = new Chart(document.getElementById("Line-Chart"), {
            type: 'line',
            options: {
                maintainAspectRatio: false,
                scales: {
                    xAxes: [{
                        type: 'time',
                        time: {
                            unit: 'week'
                        }
                    }],
                    yAxes: [{
                        ticks: {
                            min: 0
                        }
                    }]
                }
            },
            data: {
                labels: this.props.activityData.map(d => d.time),
                datasets: [{
                    label: 'Activity',
                    data: this.props.activityData.map(d => d.value),
                    fill: 'none',
                    backgroundColor: this.props.color,
                    pointRadius: 2,
                    borderColor: this.props.color,
                    borderWidth: 1,
                    lineTension: .5  // smoothness of graph
                },
                {
                    label: 'Goals',
                    data: this.props.goalsData.map(d => d.value),
                    fill: 'none',
                    backgroundColor: '#d03030',
                    pointRadius: 1,
                    borderColor: '#d03030',
                    borderWidth: 1,
                    lineTension: 0  // smoothness of graph
                }]
            }
        });
    }

    render () {
        return (
            <>
            <canvas height='400px' width='800px' id="Line-Chart" ></canvas>
            </>
        )
    }
}

export default LineGraph