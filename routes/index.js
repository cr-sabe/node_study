var express = require("express");
var fetch = require("node-fetch");
var setting = require("../public/setting.json");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  var promiseList = [];
  setting.mapInfos.forEach((mapInfo) => {
    var params = new URLSearchParams();
    params.append("appid", setting.apikey);
    params.append("id", mapInfo.cityID);
    params.append("lang", "ja");
    params.append("units", "metric");

    promiseList.push(
      fetch("https://api.openweathermap.org/data/2.5/weather?" + params, {
        method: "GET",
      }).then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(`${res.status} ${res.statusText}`);
        }
      }).then(json => {
		return {
            name: mapInfo.name, // 都道府県名
            weather: json.weather.description, // 天気名称
            temp: json.main.temp, // 現在気温
            tempMin: json.main.temp_min, // 最低気温
            tempMax: json.main.temp_max, // 最高気温
          };
	  })
    );
  });

  Promise.all(promiseList).then(dataList => {
    res.render("index", { dataList: dataList });
  });
});

module.exports = router;
