var fs = require("fs");

class fileDomain {
    async createFile(state, cities) {
        try {
            fs.writeFile(`.\\Files\\${state.Sigla}.json`, JSON.stringify(cities), (error) => {
                if(error) {
                    console.log(error);
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = fileDomain;