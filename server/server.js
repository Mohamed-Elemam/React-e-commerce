import { config } from "dotenv";
config();
import express from "express";
import cors from "cors";
import { dbConnection } from "./database/dbConnection.js";
import { allRouters } from "./src/modules/index.routers.js";
import { onlineWebhook } from "./src/modules/order/order.controller.js";

const app = express();
const port = process.env.PORT;
app.set("view engine", "ejs");

app.post("/webhook", express.raw({ type: "application/json" }), onlineWebhook);
app.use(cors());
app.use(express.json());

dbConnection();
allRouters(app);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
