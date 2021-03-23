var express = require('express');
var request = require('request');
var router = express.Router();

const APP_ID = "APIKEY";

/* GET home page. */
router.get('/', function(req, res, next) {
	var mapInfos = require('../public/map.json');
	if (req.query.location) {
		var mapInfo = mapInfos.find(x => x.name == req.query.location);
		var option = {
			url: "https://api.openweathermap.org/data/2.5/onecall",
			method: "GET",
			qs: {
				lat: mapInfo.lat,
				lon: mapInfo.lon,
				appid: APP_ID,
				lang: "ja",
				units: "metric"
			}
		};
		request(option, function (error, response, body) {
			var json = JSON.parse(body);
			res.render('index', {
				mapInfos: null,
				name: mapInfo.name,
				current: json.current.weather[0]
			});
		});
	} else {
		res.render('index', {
			mapInfos: mapInfos,
			name: null,
			current: null
		});
	}
});

module.exports = router;
