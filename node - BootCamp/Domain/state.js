var fs = require("fs");
var cityDomain = require("./city.js");

let cityDom = new cityDomain();

class state {
    async getStatesAsync() {
        let states = await fs.readFileSync("./Files/Base/Estados.json", "utf8");
        return JSON.parse(states);
    }

    async getCountCityStateAsync(sigla) {
        let json = await fs.readFileSync(`./Files/${sigla}.json`, "utf8");
        let states = JSON.parse(json);
        return states.length;
    }

    getCountCityState(sigla) {
        let json = fs.readFile(`./Files/${sigla}.json`, "utf8", (err, data) => {
            let states = JSON.parse(data);
            return states.length;
        });
    }

    async getFiveStateMoreCityAsync(sigla) {
        let json = await fs.readFileSync("./Files/Base/Estados.json", "utf8");
        let states = JSON.parse(json);
        let statesArray = Array.from(states);
        let list = [];

        for (let index = 0; index < statesArray.length; index++) {
            const element = statesArray[index]; 
            let length = await this.getCountCityStateAsync(element.Sigla);
            list.push({"State": element.Sigla, "QtdCities": length});
        }

        return list.sort((x, y) => {
            if(x.QtdCities > y.QtdCities) {
                return 1;
            }

            if(x.QtdCities < y.QtdCities) {
                return -1;
            }

            if(x.QtdCities == y.QtdCities) {
                if(x.State > y.State) {
                    return 1;
                }

                if(x.State < y.State) {
                    return -1;
                }
            }
        });
    }

    async getMaiorCidadeDeCadaEstado() {
        let json = await fs.readFileSync("./Files/Base/Estados.json", "utf8");
        let states = JSON.parse(json);
        let statesArray = Array.from(states);
        let list = [];
        let citiessort = [];

        for (let index = 0; index < statesArray.length; index++) {
            const element = statesArray[index]; 
            let cities = await cityDom.getCitiesByID(element.ID); 
            
            citiessort = cities.sort((x, y) => {
                if(x.Nome.length > y.Nome.length) {
                    return 1;
                }
    
                if(x.Nome.length < y.Nome.length) {
                    return -1;
                }
    
                if(x.Nome.length == y.Nome.length) {
                    if(x.Nome > y.Nome) {
                        return 1;
                    }
    
                    if(x.Nome < y.Nome) {
                        return -1;
                    }
                }
            });
            
            list.push(citiessort);
        }

        return list;
    }

    async getMaiorCidadeTodosEstados() {
        let json = await fs.readFileSync("./Files/Base/Cidades.json", "utf8");
        let states = JSON.parse(json);
        let citiesarray = Array.from(states);
        let list = [];
        let citiessort = [];

        citiessort = citiesarray.sort((x, y) => {
            if(x.Nome.length > y.Nome.length) {
                return 1;
            }

            if(x.Nome.length < y.Nome.length) {
                return -1;
            }

            if(x.Nome.length == y.Nome.length) {
                if(x.Nome > y.Nome) {
                    return 1;
                }

                if(x.Nome < y.Nome) {
                    return -1;
                }
            }
        });

        return citiessort;
    }
}

module.exports = state;