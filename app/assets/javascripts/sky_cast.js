window.SkyCast = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    SkyCast.Models.weather = new SkyCast.Models.Weather();

    this.header = new SkyCast.Views.Header({el: $("#header")});
    SkyCast.autocomplete = this.initAutocomplete();
    this.router = new SkyCast.Routers.Router({$rootEl: $("#main")});

    Backbone.history.start();
  },

  initAutocomplete: function() {
    var autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
        {types: ['geocode']});

    autocomplete.addListener('place_changed', SkyCast.Models.weather.getNewWeather);
    return autocomplete;
  },

  geolocate: function(autocomplete) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var geolocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        var circle = new google.maps.Circle({
          center: geolocation,
          radius: position.coords.accuracy
        });
        autocomplete.setBounds(circle.getBounds());
      });
    }
  }

};

$(document).ready(function(){
  SkyCast.initialize();
});
