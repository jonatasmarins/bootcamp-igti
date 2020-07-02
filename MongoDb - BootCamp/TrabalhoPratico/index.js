import express from 'express';
import bodyParser from 'body-parser';
import { RouterAccount } from './Routers/routeAccount.js';
import { OpenConnection } from './Domain/Connection/connection.js';

const app = express();

app.use(bodyParser.json());
app.use("/v1/account", RouterAccount);

OpenConnection();

app.listen(3000, async () => {
    console.log("API running");
});