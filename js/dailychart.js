/*!
 * Start Bootstrap - SB Admin 2 v4.0.7 (https://startbootstrap.com/template-overviews/sb-admin-2)
 * Copyright 2013-2020 Start Bootstrap
 * Licensed under MIT (https://github.com/BlackrockDigital/startbootstrap-sb-admin-2/blob/master/LICENSE)
 */

function drawChart() {
    
    var color = Chart.helpers.color;
    var config = {
        type: "line",
        data: {
            labels: maindata.dates,
            datasets: [{
                label: "Casos Confirmados",
                backgroundColor: color(window.chartColors.purple).alpha(0.5).rgbString(),
                borderColor: window.chartColors.purple,
                borderWidth: 4,
                fill: false,
                data: maindata.confirmed
            }, {
                label: "Casos Suspeitos",
                backgroundColor: color(window.chartColors.blue).alpha(0.5).rgbString(),
                borderColor: window.chartColors.blue,
                borderWidth: 1,
                fill: false,
                data: maindata.suspects
            }, {
                label: "Contactos em Vigilância",
                backgroundColor: color(window.chartColors.orange).alpha(0.5).rgbString(),
                borderColor: window.chartColors.orange,
                borderWidth: 1,
                fill: false,
                data: maindata.contacts
            }, {
                label: "Obitos",
                backgroundColor: color(window.chartColors.red).alpha(0.5).rgbString(),
                borderColor: window.chartColors.red,
                borderWidth: 1,
                fill: false,
                data: maindata.deaths
            }, {
                label: "Recuperados",
                backgroundColor: color(window.chartColors.green).alpha(0.5).rgbString(),
                borderColor: window.chartColors.green,
                borderWidth: 1,
                fill: false,
                data: maindata.recovered
            }]
        },
        options:
        {
            responsive: true,

            tooltips: {
                mode: 'index',
                callbacks: {
                    label: function (tooltipItem, data) {
                        if (tooltipItem.index > 0) {
                            growth = (data.datasets[0].data[tooltipItem.index] - data.datasets[0].data[tooltipItem.index - 1]) / data.datasets[0].data[tooltipItem.index - 1];
                        }
                        else {
                            growth = "";
                        }
                        return data.datasets[tooltipItem.datasetIndex].label + ': ' + data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index].toLocaleString();

                    },

                    afterBody: function (tooltipItem, data) {
                        return "Taxa de Crescimento: " + growth.toLocaleString();
                    }


                }
            },
            maintainAspectRatio: false,

            title: {
                text: 'Chart.js Time Scale'
            },
            scales: {
                xAxes: [{
                    type: 'time',
                    time: {
                        parser: timeFormat,
                        unit: "day",
                        // round: 'day'
                        tooltipFormat: 'DD/MM/YYYY'
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Date'
                    }
                }],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: 'value'
                    }
                }]
            },
        }
    }
    var ctx = document.getElementById('canvas').getContext('2d');
    window.myLine = new Chart(ctx, config);
}
