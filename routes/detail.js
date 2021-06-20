var express = require("express");
var fetch = require("node-fetch");
var setting = require("../public/setting.json");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  var mapInfo = setting.mapInfos.find(x => x.cityID == req.query.cityID);
  var params = new URLSearchParams();
  params.append("appid", setting.apikey);
  params.append("id", req.query.cityID);
  params.append("lang", "ja");
  params.append("units", "metric");

  fetch("https://api.openweathermap.org/data/2.5/forecast?" + params, {
    method: "GET",
  }).then(res => {
    if (res.ok) {
      return res.json();
    } else {
      throw new Error(`${res.status} ${res.statusText}`);
    }
  }).then(json => {
    var list = [];
    json.list.forEach(elem => {
      var date = new Date(elem.dt * 1000);
      var timeElems = date.toLocaleTimeString().split(":");
      list.push({
        dt: date.toLocaleDateString().slice(5) + " " + timeElems[0] + "時",
        icon: elem.weather[0].icon
      });
    });
    res.render("detail", {
      name: mapInfo.name,
      list: list
    });
  });
});

module.exports = router;
