function useIP() {
  $.getJSON("https://json.geoiplookup.io/?callback=?",
      function (data) {
        console.log(data);
        // TODO: use data.city for later
        usingGeolocation || moveToUser(data.latitude, data.longitude);
        getWatch(data.latitude, data.longitude);
      }
  );
}

function getWatch(lat, long) {
  $.ajax({
    url: 'https://weather.cit.api.here.com/weather/1.0/report.json',
    type: 'GET',
    dataType: 'jsonp',
    jsonp: 'jsonpcallback',
    data: {
      product: 'nws_alerts',
      latitude: lat,
      longitude: long,
      oneobservation: 'true',
      app_id: 'devportal-demo-20180625',
      app_code: '9v2BkviRwi9Ot26kp2IysQ'
    },
    success: function (watchData) {
      for (i = watchData.nwsAlerts.watch.length-1; i >= 0; i--) {
        if (watchData.nwsAlerts.watch[i].type == 9) {
          console.log(watchData.nwsAlerts.watch[i].description); // put this on the right side of the website
          for (i = 0; i < watchData.nwsAlerts.watch[i].zone.length; i++) {
            watchData.nwsAlerts.watch[i].zone[i]; //plot all these points on the map
          }
        }
      }
    }
  });
}
