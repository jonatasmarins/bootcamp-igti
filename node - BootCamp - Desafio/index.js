const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const gradeRouter = require("./Routes/grade.js");
const gradeDomain = require("./Domain/gradeDomain.js");

const app = express();

app.use(bodyParser.json());
app.use("/v1/grade", gradeRouter);


app.listen(3000, async () => {
    console.log("API running");

    const grade = new gradeDomain();
    grade.readGrades();
});