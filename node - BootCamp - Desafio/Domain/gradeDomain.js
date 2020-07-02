var fs = require("fs");
global.grades;
global.pathGradeJson = "./Files/grades.json";

class gradeDomain {
    async readGrades() {
        var result = await fs.readFileSync(global.pathGradeJson, "utf8");
        global.grades = JSON.parse(result);

        console.log(global.grades)

    }
}

module.exports = gradeDomain;