"use strict";

var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var webRequest = require("request");

var app = express();

var AWS = require("aws-sdk");

AWS.config.update({
    region: "us-west-2"
});

app.set("views", path.join(__dirname, "views"));

app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", function(req, res) {
	res.render("connect", {title: "Connexion"});
});

app.get("/query", function(req, res) {
	res.render("query", {title: "Information pathologie"});
});

app.get("/results", function(req, res) {
	res.render("results", {title: "Resultats"});
});

app.post("/query", function(req, res) {
	var potatoes = req.body.pathos;
	res.render("results", {title: "Resultats", processedResult: potatoes});
})
app.post("/", function(req, res) {
	res.redirect("query");
})

app.listen(process.env.PORT||1337, function() {
    console.log("Server is running on port ..");
});