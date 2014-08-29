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

    var xplotLines = buildPlotlineArray(new Date(sensor1_temp[0][0]), new Date(sensor1_temp[sensor1_temp.length-1][0]));

    $('#container').highcharts('StockChart', {

        legend: { enabled: true },
        
        rangeSelector : {
            selected : 0,
            inputEnabled: false,
            buttons: [  {   type: 'day',    count: 1,   text: '1d'}, 
                        {   type: 'day',    count: 7,   text: '7d'}, 
                        {   type: 'month',  count: 1,   text: '1m'}, 
                        {   type: 'ytd',    text: 'YTD'}, 
                        {   type: 'year',   count: 1,   text: '1y'}, 
                        {   type: 'all',    text: 'All'} ]
                    },

        title : {
            text : 'Ambiente da Sala'
        },

        xAxis: {
            plotLines: xplotLines
        },

        yAxis: [{
            opposite: true,
            tickWidth: 2,
            tickColor: 'rgb(50, 250, 50)',
            position: 'inside',
            labels: {
                format: '{value} °C'
            },
        }, 
        {
            opposite: true,
            tickWidth: 2,
            tickColor: 'rgb(124, 181, 236)',
            offset: 10,
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


function buildPlotlineArray(dtInicio, dtFim) {
    var oneday = 24*60*60*1000;
    //var tzoffset=0;
    var tzoffset=dtFim.getTimezoneOffset()/60;
    dtFim.setHours(-tzoffset);
    dtFim.setMinutes(0);
    dtFim.setSeconds(0);

    var result = [];
    result.push({ value: dtFim.getTime(), width: 1, color: 'green', dashStyle: 'dash'});

    while( dtFim > dtInicio ) {
        dtFim = new Date(dtFim -= oneday);
        result.push({ value: (dtFim.getTime()), width: 1, color: 'green', dashStyle: 'dash'});        
    }

    return result;
}
