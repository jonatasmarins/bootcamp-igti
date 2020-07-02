var fs = require("fs");

class city {
    async getCities() {
        let cities = await fs.readFileSync("./Files/Base/Cidades.json", "utf8");
        return Json.parse(cities);
    }

    async getCitiesByID(id) {
        let cities = await fs.readFileSync("./Files/Base/Cidades.json", "utf8");
        cities = JSON.parse(cities);
        return cities.filter(x => x.Estado == id);
    }
}

module.exports = city;