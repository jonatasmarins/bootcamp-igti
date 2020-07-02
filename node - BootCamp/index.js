var express = require("express");
var fs = require("fs");
var stateDomain = require("./Domain/state.js");
var cityDomain = require("./Domain/city.js");
var fileDomain = require("./Domain/file.js");

var app = express();

const state = new stateDomain();
const city = new cityDomain();
const file = new fileDomain();

app.get("/countCityState/:sigla", async (req, res) => {
    let length = await state.getCountCityStateAsync(req.params.sigla);
    res.send(`Existem ${length} cidades no estado de ${req.params.sigla}`);
});

app.get("/fiveCityHasMoreCities", async (req, res) => {
    let liststates = await state.getFiveStateMoreCityAsync();
    res.send(liststates);
});

app.get("/getMaiorCidadeDeCadaEstado", async (req, res) => {
    let liststates = await state.getMaiorCidadeDeCadaEstado();
    res.send(liststates);
});

app.get("/getMaiorCidadeTodosEstados", async (req, res) => {
    let liststates = await state.getMaiorCidadeTodosEstados();
    res.send(liststates);
});

app.listen(3000, async () => {
    let liststate = await state.getStatesAsync();
    liststate.forEach(async stateElement => {
        listCities = await city.getCitiesByID(stateElement.ID);   
        file.createFile(stateElement, listCities); 
    });
});