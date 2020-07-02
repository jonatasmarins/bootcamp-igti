const express = require("express");
const fileDomain = require("../Domain/fileDomain.js");
const router = express.Router();

router.post("/", async (req, res) => {
    try {
        let data = await fileDomain.Read(global.pathGradeJson);
        let json = JSON.parse(data);

        let grade = req.body;
        grade.timestamp = new Date().toISOString();
        grade.id = json.nextId;

        json.grades.push(grade);
        json.nextId++;

        fileDomain.Write(global.pathGradeJson, json);

        res.send({message: "Grade added with success.", item: grade});

    } catch (error) {
        console.log(error);
        res.send(error);
    }
});

router.put("/", async (req, res) => {
    try {
        let result;
        let statusCode = 200;
        let data = await fileDomain.Read(global.pathGradeJson);
        let json = JSON.parse(data);

        let request = req.body;
        request.timestamp = new Date().toISOString();

        let gradeIndex = json.grades.findIndex(x => x.id === request.id);

        if (gradeIndex !== -1) {
            json.grades[gradeIndex].student = request.student;
            json.grades[gradeIndex].subject = request.subject;
            json.grades[gradeIndex].type = request.type;
            json.grades[gradeIndex].value = request.value;

            result = { message: "Grade updated with success.", item: json.grades[gradeIndex] };

            fileDomain.Write(global.pathGradeJson, json);
        } else {
            let msgError = `Not found grade id ${request.id}`;
            console.log(msgError);
            result = msgError;
            statusCode = 400;
        }

        res.status(statusCode).send(result);

    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        let result;
        let statusCode = 200;
        let data = await fileDomain.Read(global.pathGradeJson);
        let json = JSON.parse(data);

        let gradeIndex = json.grades.findIndex(x => x.id === parseInt(req.params.id));

        if (gradeIndex !== -1) {
            gradeDeleted = json.grades.find(x => x.id === parseInt(req.params.id));
            result = { message: "Grade deleted with success.", item: gradeDeleted };

            let grades = json.grades.filter(x => x.id !== parseInt(req.params.id));
            json.grades = grades;

            fileDomain.Write(global.pathGradeJson, json);
        } else {
            let msgError = `Not found grade id ${req.params.id}`;
            console.log(msgError);
            result = msgError;
            statusCode = 400;
        }

        res.status(statusCode).send(result);

    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

router.get("/:id", async (req, res) => {
    try {
        let result;
        let statusCode = 200;
        let data = await fileDomain.Read(global.pathGradeJson);
        let json = JSON.parse(data);

        let gradeIndex = json.grades.findIndex(x => x.id === parseInt(req.params.id));

        if (gradeIndex !== -1) {
            result = json.grades.find(x => x.id === parseInt(req.params.id));
        } else {
            let msgError = `Not found grade id ${req.params.id}`;
            console.log(msgError);
            result = msgError;
            statusCode = 400;
        }

        res.status(statusCode).send(result);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

router.get("/student/subject", async (req, res) => {
    try {
        let result;
        let statusCode = 200;
        let data = await fileDomain.Read(global.pathGradeJson);
        let json = JSON.parse(data);
        let sumNote = 0;
        const {student, subject} = req.query;

        let subjects = json.grades.filter(x => x.student === student && x.subject === subject );

        if (subjects !== null && subjects !== undefined && subjects.length > 0) {
            Array.from(subjects).forEach(element => {
                sumNote += element.value;
            });
            result = {total: sumNote, items: subjects};
        } else {
            let msgError = `Not found grade of student ${student} '${subject}'`;
            console.log(msgError);
            result = msgError;
            statusCode = 400;
        }

        res.status(statusCode).send(result);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

router.get("/subject/type", async (req, res) => {
    try {
        let result;
        let statusCode = 200;
        let data = await fileDomain.Read(global.pathGradeJson);
        let json = JSON.parse(data);
        let sumValue = 0;
        let qtd = 0;
        const {subject, type} = req.query;

        let subjects = json.grades.filter(x => x.subject === subject && x.type === type );

        if (subjects !== null && subjects !== undefined && subjects.length > 0) {
            Array.from(subjects).forEach(element => {
                sumValue += element.value;
                qtd++;
            });

            let avg = sumValue / qtd;
            result = {avg: avg, items: subjects};
        } else {
            let msgError = `Not found subject '${subject}' - '${type}'`;
            console.log(msgError);
            result = msgError;
            statusCode = 400;
        }

        res.status(statusCode).send(result);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

router.get("/subject/type/topthree", async (req, res) => {
    try {
        let result;
        let statusCode = 200;
        let data = await fileDomain.Read(global.pathGradeJson);
        let json = JSON.parse(data);
        const {subject, type} = req.query;

        let subjects = json.grades.filter(x => x.subject === subject && x.type === type );

        if (subjects !== null && subjects !== undefined && subjects.length > 0) {

            let subjectSort = subjects.sort((x, y) => {
                if(x.value < y.value) {
                    return 1;
                }
                else if(x.value > y.value) {
                    return -1;
                } else  {
                    return 0;
                }
            });

            if(subjects.length > 3) {
                subjectSort = subjectSort.slice(0, 3);
            }

            result = {items: subjectSort};
        } else {
            let msgError = `Not found subject '${subject}' - '${type}'`;
            console.log(msgError);
            result = msgError;
            statusCode = 400;
        }

        res.status(statusCode).send(result);
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
});

module.exports = router;