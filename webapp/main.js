var loadDataCallback = function (data) {
    // Create the chart
    sensor1_temp = [];
    sensor2_temp = [];
    sensor2_humi = [];
    
    data.forEach(function(d){ 
        var timestamp = parseInt(d[0]);
        sensor1_temp.push( [timestamp, d[1]] );
        sensor2_temp.push( [timestamp, d[2]] );
        sensor2_humi.push( [timestamp, d[3]] );
    });

    $('#container').highcharts('StockChart', {


        rangeSelector : {
            selected : 1,
            inputEnabled: false 
        },

        title : {
            text : 'Ambiente da Sala'
        },

        yAxis: [{
            opposite: false,
            labels: {
                format: '{value} °C'
            },
        }, 
        {
            opposite: true,
            labels: {
                format: '{value} %'
            }
        }],

        series : [{
            name : 'Temperatura 1',
            color: 'rgb(50, 250, 50)',
            data : sensor1_temp,
            tooltip: {
                valueDecimals: 2,
                valueSuffix: ' °C'
            }
        },
        {
            name : 'Temperatura 2',
            color: 'rgb(0, 200, 0)',
            data : sensor2_temp,
            tooltip: {
                valueDecimals: 2,
                valueSuffix: ' °C'
            }
        },
        {
            name : 'Humidade',
            color: 'rgb(124, 181, 236)',
            yAxis: 1,
            data : sensor2_humi,
            tooltip: {
                valueDecimals: 2,
                valueSuffix: ' %'
            }
        }]
    });
}

$(function () {
    $.getJSON('data.json', loadDataCallback);
});

