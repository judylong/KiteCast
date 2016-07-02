window.KiteCast = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    this.currentUser = new KiteCast.Models.CurrentUser();
    this.currentUser.fetch();

    KiteCast.Models.weather = new KiteCast.Models.Weather();

    this.header = new KiteCast.Views.Header({el: $("#header")});
    KiteCast.autocomplete = this.initAutocomplete();
    this.router = new KiteCast.Routers.Router({$rootEl: $("#main")});

    Backbone.history.start();
  },

  initAutocomplete: function() {
    var autocomplete = new google.maps.places.Autocomplete(
        /** @type {!HTMLInputElement} */(document.getElementById('autocomplete')),
        {types: ['geocode']});

    autocomplete.addListener('place_changed', KiteCast.Models.weather.getNewWeather);
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
  KiteCast.initialize();
});
