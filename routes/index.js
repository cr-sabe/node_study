var express = require('express');
var request = require('request');
var router = express.Router();

const APP_ID = "9d09c0e2d2d4ea3c04438c7ff433bfa8";

/* GET home page. */
router.get('/', function(req, res, next) {
	var option = {
		url: "https://api.openweathermap.org/data/2.5/onecall",
		method: "GET",
		qs: {
			lat: 35.18028,
			lon: 136.90667,
			appid: APP_ID,
			lang: "ja"
		}
	};
	request(option, function (error, response, body) {
		res.render('index', {
			current: body.current.weather.main
		});
	});
});

module.exports = router;
