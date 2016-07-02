KiteCast.Models.Weather = Backbone.Model.extend({
  url: "/api/weather/",
  parse: function(resp) {
    this.next7days(resp.next7days);
    this.next48hours(resp.next48hours);
    this.currently(resp.currently);
    this.next7days_chart(resp.next7days_chart);
    this.next48hours_chart(resp.next48hours_chart);
    return resp.results;
  },
  next7days: function(data) {
    if (data) {
      this._next7days = data;
    }
    return this._next7days;
  },
  next48hours: function(data) {
    if (data) {
      this._next48hours = data;
    }
    return this._next48hours;
  },
  currently: function(data) {
    if (data) {
      this._currently = data;
    }
    return this._currently;
  },
  next7days_chart: function(data) {
    if (data) {
      this._next7days_chart = data;
    }
    return this._next7days_chart;
  },
  next48hours_chart: function(data) {
    if (data) {
      this._next48hours_chart = data;
    }
    return this._next48hours_chart;
  },
  getNewWeather: function() {
    if (KiteCast.autocomplete.getPlace().geometry) {
      KiteCast.Models.weather.fetch({
        data: {
          "query": {"latitude": KiteCast.autocomplete.getPlace().geometry.location.lat(),
                    "longitude": KiteCast.autocomplete.getPlace().geometry.location.lng(),
                    "formatted_address": KiteCast.autocomplete.getPlace().formatted_address
                    }
        },
        success: function(model, resp) {
          Backbone.history.navigate("#display", {trigger: true});
          if (KiteCast.currentUser.isLoggedIn()) {
            KiteCast.currentUser.fetch();
          }
          KiteCast.Models.weather.trigger('reRender');
        },
        error: function(model, resp) {
          alert("Error");
        }
      });
    }
  }
});
