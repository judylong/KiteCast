SkyCast.Views.DisplayResult = Backbone.View.extend({
  initialize: function() {
    this.listenTo(SkyCast.Models.weather, "reRender", this.render);
  },

  template: JST['displayResult'],

  render: function() {
    var content = this.template();
    this.$el.html(content);
    setTimeout(this.renderSubviews.bind(this),0);
    return this;
  },

  renderSubviews: function() {
    $('.chart-hourly').highcharts({
        title: {
            text: 'Next 48 Hours',
            x: -20 //center
        },
        xAxis: {
            categories: this.model.next48hours_chart().time
        },
        yAxis: {
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        },
        series: [{
            name: 'Temperature',
            data: this.model.next48hours_chart().temperature,
            tooltip: { valueSuffix: '°F', valueDecimals: 1},
        }, {
            name: 'Humidity',
            data: this.model.next48hours_chart().humidity,
            tooltip: { valueSuffix: '%', valueDecimals: 1}
        }, {
            name: 'Wind Speed',
            data: this.model.next48hours_chart().windSpeed,
            tooltip: { valueSuffix: 'mph', valueDecimals: 1}
        }, {
            name: 'Probablility of Precipitation',
            data: this.model.next48hours_chart().precipProbability,
            tooltip: { valueSuffix: '%', valueDecimals: 1}
        }, {
            name: 'Cloud Cover',
            data: this.model.next48hours_chart().cloudCover,
            tooltip: { valueSuffix: '%', valueDecimals: 1}
        }]
    });

    $('.display-currently').html(JST['display/currently']({weather: this.model}));
    $('.display-weekly').html(JST['display/weekly']({weather: this.model}));
  }
});
