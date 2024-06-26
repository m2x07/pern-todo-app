import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import * as db from "./db/index.js";

dotenv.config();
const app = express();
const PORT = process.env.BACKEND_PORT || 9000;

app.use(
    cors({
        origin: process.env.FRONTEND_URL,
    }),
);
app.use(express.json());

// configure the routes

app.get("/", async (req, res) => {
    const responce = await db.query("SELECT * FROM main ORDER BY id");
    res.send(responce.rows);
});

app.post("/new", async (req, res) => {
    console.log(req.body);
    db.query("INSERT INTO main (id, data, done) VALUES($1, $2, $3)", [
        req.body.id,
        req.body.data,
        req.body.done,
    ]);
    res.status(200).send("todo added");
});

app.patch("/update", async (req, res) => {
    db.query("UPDATE main SET data = $1, done = $2 WHERE id = $3", [
        req.body.data,
        req.body.done,
        req.body.id,
    ]);
    res.status(200).send("todo updated");
});

app.delete("/delete", async (req, res) => {
    db.query("DELETE FROM main WHERE id = $1", [req.body.id]);
    res.status(200).send("todo deleted");
});

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
});
