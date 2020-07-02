import express from 'express';
import accountService from '../Domain/Services/accountServices.js';

const RouterAccount = express.Router();
const service = new accountService();

RouterAccount.get("/", async (req, res) => {
    try {    
        const accounts = await service.GetAll();
        res.send(accounts);
    } catch (error) {
        res.status(500).send({message: "Ocorreu um erro inesperado", detail: error.message});
    }
});

RouterAccount.get("/:agency/:account", async (req, res) => {
    try {    
        const agency = req.params["agency"];
        const account = req.params["account"];

        const accountFilter = await service.GetAccount(agency, account);

        res.status(accountFilter.statusCode).send(accountFilter);

    } catch (error) {
        res.status(500).send({message: "Ocorreu um erro inesperado", detail: error.message});
    }
});

RouterAccount.put("/deposit", async (req, res) => {
    try {    
        const properties = req.body;
        const accountFilter = await service.desposit(properties);

        res.send(accountFilter);

    } catch (error) {
        res.status(500).send({message: "Ocorreu um erro inesperado", detail: error.message});
    }
});

RouterAccount.put("/withDraw", async (req, res) => {
    try {    
        const properties = req.body;
        const accountFilter = await service.withDraw(properties);

        res.send(accountFilter);

    } catch (error) {
        res.status(500).send({message: "Ocorreu um erro inesperado", detail: error.message});
    }
});

RouterAccount.delete("/delete", async (req, res) => {
    try {    
        const properties = req.body;        
        const accountFilter = await service.delete(properties);

        res.send(accountFilter);

    } catch (error) {
        res.status(500).send({message: "Ocorreu um erro inesperado", detail: error.message});
    }
});

RouterAccount.post("/transfer", async (req, res) => {
    try {    
        const properties = req.body;
        const accountFilter = await service.transfer(properties);

        res.send(accountFilter);

    } catch (error) {
        res.status(500).send({message: "Ocorreu um erro inesperado", detail: error.message});
    }
});

RouterAccount.get("/balanceAVGAgenties", async (req, res) => {
    try {  
        const agency = req.query["agency"];
        const accountFilter = await service.agencyBalanceAVG(agency);

        res.send(accountFilter);

    } catch (error) {
        res.status(500).send({message: "Ocorreu um erro inesperado", detail: error});
    }
});

RouterAccount.get("/accountsLessBalance", async (req, res) => {
    try {  
        const quantity = req.query["quantity"];
        const accountFilter = await service.accountsLessBalance(quantity);

        res.send(accountFilter);

    } catch (error) {
        res.status(500).send({message: "Ocorreu um erro inesperado", detail: error});
    }
});

RouterAccount.get("/accountsMoreBalance", async (req, res) => {
    try {  
        const quantity = req.query["quantity"];
        const accountFilter = await service.accountsMoreBalance(quantity);

        res.send(accountFilter);

    } catch (error) {
        res.status(500).send({message: "Ocorreu um erro inesperado", detail: error});
    }
});

RouterAccount.get("/transferAccountForAgencyPrivate", async (req, res) => {
    try {  
        const accountFilter = await service.transferAccountForAgencyPrivate();

        res.send(accountFilter);

    } catch (error) {
        res.status(500).send({message: "Ocorreu um erro inesperado", detail: error});
    }
});

export { RouterAccount };