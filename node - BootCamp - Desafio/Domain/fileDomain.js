var fs = require("fs");

class fileDomain {
    static async Write(pathFile, data) {
        try {

            await fs.writeFileSync(pathFile, JSON.stringify(data));

        } catch (error) {
            console.error("Not possibled add grade in base");
        }
    }

    static async Read(pathFile) {
        try {

            return await fs.readFileSync(pathFile, "utf8");

        } catch (error) {
            console.error("Not possibled read grades");
        }
    }
}

module.exports = fileDomain;